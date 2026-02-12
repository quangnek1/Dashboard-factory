import { createFileRoute } from '@tanstack/react-router'
import productionEngineering from '@/features/dashboard/pe'

export const Route = createFileRoute(
  '/_authenticated/Dashboard/productionEngineering'
)({
  component: productionEngineering,
})
