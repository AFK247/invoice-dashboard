import { InvoiceFormData } from '@/views/invoice/CreateInvoice'
import axios from 'axios'

export const getInvoiceList = async () => {
  try {
    const { data } = await axios.get('http://localhost:5000/api/v1/invoice')

    return data?.data
  } catch (err) {
    console.log('Failed to fetch invoices:', err)
  }
}

export const createInvoice = async (invoiceData: InvoiceFormData, accessToken: string, realmId: string) => {
  try {
    const { data } = await axios.post('http://localhost:5000/api/v1/invoice/create', invoiceData, {
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
