// Type Imports
import type { HorizontalMenuDataType } from '@/types/menuTypes'

const horizontalMenuData = (): HorizontalMenuDataType[] => [
  {
    label: 'Invoice List',
    href: '/invoice-list',
    icon: 'tabler-smart-home'
  },
  {
    label: 'Create Invoice',
    href: '/create-invoice',
    icon: 'tabler-info-circle'
  }
]

export default horizontalMenuData
