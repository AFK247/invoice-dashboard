'use client'
import { useState } from 'react'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Typography, TextField, Button, MenuItem, Grid, Paper, Box } from '@mui/material'
import axios from 'axios'

import { getCookieValue } from '@/utils/getCookie'

// Zod Schema
const invoiceSchema = z.object({
  clientName: z.string().min(1, 'Client name is required'),
  email: z.string().email('Invalid email'),
  dueDate: z.string().min(1, 'Due date is required'),
  amount: z.number({ invalid_type_error: 'Amount must be a number' }).positive('Amount must be greater than 0'),
  status: z.enum(['Draft', 'Paid']),
  description: z.string().optional()
})

// Type from schema
type InvoiceFormData = z.infer<typeof invoiceSchema>

export const CreateInvoice = () => {
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<InvoiceFormData>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      status: 'Draft'
    }
  })

  const onSubmit = async (invoiceData: InvoiceFormData) => {
    setLoading(true)

    const accessToken = getCookieValue('qb_access_token')
    const realmId = getCookieValue('qb_realm_id')

    if (!accessToken || !realmId) {
      setLoading(false)

      return alert('Authorization failed. Please log in again.')
    }

    try {
      const { data } = await axios.post('http://localhost:5000/api/v1/invoice/create', invoiceData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          realmId
        }
      })

      if (data?.success) {
        alert('Invoice created!')
        reset()
      }
    } catch (error) {
      console.error(error)
      alert('Error creating invoice.')
    }

    setLoading(false)
  }

  return (
    <Box>
      <Typography variant='h4' gutterBottom>
        Create Invoice
      </Typography>
      <Paper sx={{ p: 4 }}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <TextField
                label='Client Name'
                fullWidth
                {...register('clientName')}
                error={!!errors.clientName}
                helperText={errors.clientName?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label='Email'
                type='email'
                fullWidth
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label='Due Date'
                type='date'
                InputLabelProps={{ shrink: true }}
                fullWidth
                {...register('dueDate')}
                error={!!errors.dueDate}
                helperText={errors.dueDate?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label='Amount'
                type='number'
                fullWidth
                {...register('amount', { valueAsNumber: true })}
                error={!!errors.amount}
                helperText={errors.amount?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label='Status'
                select
                fullWidth
                defaultValue='Draft'
                {...register('status')}
                error={!!errors.status}
                helperText={errors.status?.message}
              >
                <MenuItem value='Draft'>Draft</MenuItem>
                <MenuItem value='Paid'>Paid</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField label='Description' fullWidth multiline rows={3} {...register('description')} />
            </Grid>
            <Grid item xs={12}>
              <Button disabled={loading} type='submit' variant='contained' color='primary'>
                {loading ? 'Creating Invoice' : 'Create Invoice'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  )
}
