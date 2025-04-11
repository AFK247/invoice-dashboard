'use client'
import { useState, useEffect } from 'react'

import { Typography, Paper, Box, CircularProgress } from '@mui/material'
import type { GridColDef } from '@mui/x-data-grid'
import { DataGrid } from '@mui/x-data-grid'

import { getInvoiceList } from '@/service/invoice'

// Define the Invoice interface based on your API response
interface Invoice {
  id: number
  clientName: string
  email: string
  amount: string
  dueDate: string
  status: string
  description: string
  createdAt?: string
}

// Simple columns without any formatters
const columns: GridColDef[] = [
  { field: 'id', headerName: 'Invoice ID', flex: 1 },
  { field: 'clientName', headerName: 'Client Name', flex: 1 },
  { field: 'email', headerName: 'Email', flex: 1 },
  { field: 'amount', headerName: 'Amount', flex: 1 },
  { field: 'dueDate', headerName: 'Due Date', flex: 1 },
  { field: 'status', headerName: 'Status', flex: 1 },
  { field: 'description', headerName: 'Description', flex: 1 },
  { field: 'createdAt', headerName: 'Created Date', flex: 1 }
]

export const InvoiceList = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0
  })

  const fetchInvoices = async () => {
    setLoading(true)

    const res = await getInvoiceList()

    if (res) {
      setInvoices(res)
      setError(null)
    } else {
      setError('Failed to load invoices.')
    }

    setLoading(false)
  }

  useEffect(() => {
    fetchInvoices()
  }, [])

  return (
    <Box>
      <Typography variant='h4' gutterBottom>
        Invoices
      </Typography>
      <Paper sx={{ height: 500 }}>
        {loading ? (
          <Box display='flex' justifyContent='center' alignItems='center' height='100%'>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box display='flex' justifyContent='center' alignItems='center' height='100%' p={3}>
            <Typography variant='h4' color='error'>
              {error}
            </Typography>
          </Box>
        ) : (
          <DataGrid
            disableRowSelectionOnClick={true}
            rows={invoices}
            columns={columns}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[5, 10, 25]}
            initialState={{
              sorting: {
                sortModel: [{ field: 'dueDate', sort: 'asc' }]
              }
            }}
          />
        )}
      </Paper>
    </Box>
  )
}
