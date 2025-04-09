// Type Imports
import type { VerticalMenuDataType } from '@/types/menuTypes'

const verticalMenuData = (): VerticalMenuDataType[] => [
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

export default verticalMenuData
