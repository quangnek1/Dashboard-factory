import DashboardLogistics from '@/features/dashboard/logistics'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/Dashboard/logistics')({
  component: DashboardLogistics,
})

 