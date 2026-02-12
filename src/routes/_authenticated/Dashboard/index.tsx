import DashboardProduction from '@/features/dashboard/production'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/Dashboard/')({
  component: DashboardProduction,
})
