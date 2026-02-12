import DashboardADM from '@/features/dashboard/adm-hr'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/Dashboard/adm-hr')({
  component: DashboardADM,
})

 