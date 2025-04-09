'use client'
import { useState } from 'react'

import { Typography, Paper, Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

const columns = [
  { field: 'id', headerName: 'Invoice ID', flex: 1 },
  { field: 'clientName', headerName: 'Client Name', flex: 1 },
  { field: 'email', headerName: 'Email', flex: 1 },
  { field: 'amount', headerName: 'Amount', flex: 1 },
  { field: 'status', headerName: 'Status', flex: 1 },
  { field: 'createdAt', headerName: 'Created Date', flex: 1 }
]

const dummyInvoices = [
  {
    id: 1,
    clientName: 'John Doe',
    email: 'john@example.com',
    amount: 1200,
    status: 'Paid',
    createdAt: '2024-04-01'
  },
  {
    id: 2,
    clientName: 'Jane Smith',
    email: 'jane@example.com',
    amount: 850,
    status: 'Draft',
    createdAt: '2024-04-03'
  },
  {
    id: 3,
    clientName: 'Acme Corp',
    email: 'contact@acme.com',
    amount: 3000,
    status: 'Paid',
    createdAt: '2024-04-05'
  }
]

export const InvoiceList = () => {
  const [invoices] = useState(dummyInvoices)

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0
  })

  return (
    <Box>
      <Typography variant='h4' gutterBottom>
        Invoices
      </Typography>
      <Paper sx={{ height: 500 }}>
        <DataGrid
          disableRowSelectionOnClick={true}
          rows={invoices}
          columns={columns}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[5, 10, 25]}
        />
      </Paper>
    </Box>
  )
}
