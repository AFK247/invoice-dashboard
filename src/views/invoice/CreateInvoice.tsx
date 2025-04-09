'use client'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Typography, TextField, Button, MenuItem, Grid, Paper, Box } from '@mui/material'
import axios from 'axios'

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

  const onSubmit = async (data: InvoiceFormData) => {
    try {
      await axios.post('/api/invoices', data)
      alert('Invoice created!')
      reset()
    } catch (error) {
      console.error(error)
      alert('Error creating invoice.')
    }
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
              <Button type='submit' variant='contained' color='primary'>
                Create Invoice
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  )
}
