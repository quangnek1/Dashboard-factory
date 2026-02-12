import DashboardQA from '@/features/dashboard/qa'
import DashboardQAV2 from '@/features/dashboard/qa'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/Dashboard/qa')({
  component: DashboardQA,
})

 