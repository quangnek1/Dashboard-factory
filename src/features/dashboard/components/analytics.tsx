import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ProductionOutputCard } from './ProductionOutputCardchart'
import { QualityEfficiencyCard } from './QualityEfficiencyCardChart'
import { AnalyticsChart } from './analytics-chart'

export function Analytics() {
  return (
    <div className='space-y-4'>
      <Card>
        <CardHeader>
          <CardTitle>Production Performance Trend</CardTitle>
          <CardDescription>Weekly Actual vs Planned</CardDescription>
        </CardHeader>
        <CardContent className='px-6'>
          <AnalyticsChart />
        </CardContent>
      </Card>
      <div className='grid gap-2 sm:grid-cols-2 lg:grid-cols-2'>
          <ProductionOutputCard />
          <QualityEfficiencyCard />
      </div>
      <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
        <Card className='col-span-1 border-slate-200 shadow-sm lg:col-span-4'>
          <CardHeader className='pb-3'>
            <div className='flex items-center justify-between'>
              <div>
                <CardTitle className='text-lg font-bold text-slate-800'>
                  Defect Analysis (NG)
                </CardTitle>
                <CardDescription className='text-xs'>
                  Top reasons for product rejection this shift
                </CardDescription>
              </div>
              <div className='flex h-8 w-8 items-center justify-center rounded-full bg-rose-50'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                  className='h-4 w-4 text-rose-600'
                >
                  <path
                    fillRule='evenodd'
                    d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <SimpleBarList
              items={[
                { name: 'Dimension Out of Range', value: 512 },
                { name: 'Surface Scratch / Dent', value: 238 },
                { name: 'Contamination (Dust)', value: 174 },
                { name: 'Packaging Leak', value: 104 },
                { name: 'Other Minor Defects', value: 45 },
              ]}
              // Sử dụng màu rose để cảnh báo lỗi
              barClass='bg-rose-500 transition-all duration-500 hover:bg-rose-600'
              valueFormatter={(n) => `${n.toLocaleString()} pcs`}
            />
            <div className='mt-6 flex items-center justify-between border-t border-dashed pt-4 text-[10px] font-bold tracking-widest text-slate-400 uppercase'>
              <span>Total NG Units</span>
              <span className='text-sm text-rose-600'>1,073 pcs</span>
            </div>
          </CardContent>
        </Card>
        <Card className='col-span-1 lg:col-span-3'>
          <CardHeader>
            <CardTitle>Devices</CardTitle>
            <CardDescription>How users access your app</CardDescription>
          </CardHeader>
          <CardContent>
            <SimpleBarList
              items={[
                { name: 'Desktop', value: 74 },
                { name: 'Mobile', value: 22 },
                { name: 'Tablet', value: 4 },
              ]}
              barClass='bg-muted-foreground'
              valueFormatter={(n) => `${n}%`}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function SimpleBarList({
  items,
  valueFormatter,
  barClass,
}: {
  items: { name: string; value: number }[]
  valueFormatter: (n: number) => string
  barClass: string
}) {
  const max = Math.max(...items.map((i) => i.value), 1)
  return (
    <ul className='space-y-3'>
      {items.map((i) => {
        const width = `${Math.round((i.value / max) * 100)}%`
        return (
          <li key={i.name} className='flex items-center justify-between gap-3'>
            <div className='min-w-0 flex-1'>
              <div className='mb-1 truncate text-xs text-muted-foreground'>
                {i.name}
              </div>
              <div className='h-2.5 w-full rounded-full bg-muted'>
                <div
                  className={`h-2.5 rounded-full ${barClass}`}
                  style={{ width }}
                />
              </div>
            </div>
            <div className='ps-2 text-xs font-medium tabular-nums'>
              {valueFormatter(i.value)}
            </div>
          </li>
        )
      })}
    </ul>
  )
}
