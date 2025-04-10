import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import axios, { isAxiosError } from 'axios'

import CONFIG from '@/config'
import { QB_ACCESS_TOKEN_COOKIE, QB_REALM_ID_COOKIE, QB_REFRESH_TOKEN_COOKIE } from '@/constant/quickBookAuth'

interface TokenResponse {
  access_token: string
  refresh_token: string
  expires_in: number
  token_type: string
  x_refresh_token_expires_in?: number
}

async function exchangeCodeForTokens(code: string): Promise<TokenResponse> {
  try {
    const response = await axios.post<TokenResponse>(
      'https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer',
      new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: CONFIG.quickBookRedirectUri!
      }),
      {
        headers: {
          Authorization:
            'Basic ' + Buffer.from(`${CONFIG.quickBookClientId}:${CONFIG.quickBookClientSecret}`).toString('base64'),
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    )

    return response.data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(`Token exchange failed: ${JSON.stringify(error.response.data)}`)
    }

    throw error
  }
}

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const code = searchParams.get('code')
  const realmId = searchParams.get('realmId')

  if (!code || !realmId) {
    return NextResponse.json(
      {
        error: 'Missing required parameters',
        details: 'Both code and realmId are required'
      },
      { status: 400 }
    )
  }

  try {
    const tokenData = await exchangeCodeForTokens(code)

    // Create response for redirection
    const response = NextResponse.redirect(`${CONFIG.baseUrl}/invoice-list`)

    // cookie could have been saved as httpOnly but due to sake of ease of testing Im not using it
    // const cookieOptions = {
    //   secure: true,
    //   httpOnly: true,
    //   sameSite: 'none' as const,
    //   path: '/'
    // }

    // Calculate expiry time in seconds
    const expirySeconds = tokenData.expires_in || 3600

    // Store tokens and realmId in cookies
    response.cookies.set(QB_ACCESS_TOKEN_COOKIE, tokenData.access_token, {
      maxAge: expirySeconds - 60 // Set to slightly less than token expiry
    })

    response.cookies.set(QB_REFRESH_TOKEN_COOKIE, tokenData.refresh_token, {
      maxAge: tokenData.x_refresh_token_expires_in || 24 * 60 * 60 * 90 // Default 90 days
    })

    response.cookies.set(QB_REALM_ID_COOKIE, realmId, {
      maxAge: 24 * 60 * 60 * 90 // 90 days
    })

    console.log('OAuth token exchange successful and tokens stored in cookies')

    return response
  } catch (error) {
    console.error('OAuth error:', error instanceof Error ? error.message : String(error))

    return NextResponse.json(
      {
        error: 'OAuth authentication failed',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
