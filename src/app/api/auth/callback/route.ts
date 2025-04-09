import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import axios from 'axios'

import CONFIG from '@/config'

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const code = searchParams.get('code')
  const realmId = searchParams.get('realmId')

  if (!code || !realmId) {
    return NextResponse.json({ error: 'Missing code or realmId' }, { status: 400 })
  }

  try {
    const tokenRes = await axios.post(
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

    const tokenData = tokenRes.data

    console.log(tokenData)

    return NextResponse.redirect('http://localhost:3000/invoice-list')
  } catch (err: any) {
    console.error('Token exchange failed:', err.response?.data || err.message)

    return NextResponse.json({ error: 'OAuth failed' }, { status: 500 })
  }
}
