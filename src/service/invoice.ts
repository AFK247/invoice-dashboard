import AXIOS from '@/helper/axios'
import { InvoiceFormData } from '@/views/invoice/CreateInvoice'

export const getInvoiceList = async () => {
  try {
    const { data } = await AXIOS.get('/invoice')

    return data?.data
  } catch (err) {
    console.log('Failed to fetch invoices:', err)
  }
}

export const createInvoice = async (invoiceData: InvoiceFormData, accessToken: string, realmId: string) => {
  try {
    const { data } = await AXIOS.post('/invoice/create', invoiceData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        realmId
      }
    })

    return data
  } catch (error) {
    console.log(error)
  }
}
