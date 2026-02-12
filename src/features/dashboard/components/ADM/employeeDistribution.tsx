import { TrendingUp } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'

const data = [
  { name: 'AIX', value: 5, color: '#6366f1' }, // Indigo
  { name: 'Production', value: 60, color: '#f97316' }, // Orange
  { name: 'PE', value: 20, color: '#10b981' }, // Emerald
  { name: 'ADM', value: 5, color: '#cdd831' }, // Violet
  { name: 'QA', value: 15, color: '#47c92d' }, // Slate
  { name: 'Logistic', value: 5, color: '#ee24ab' },
]

export function EmployeeDistribution() {
  return (
    <Card className='col-span-1 flex flex-col border-slate-200 shadow-sm lg:col-span-3'>
      <CardHeader className='items-center pb-0'>
        <CardTitle className='text-lg font-bold'>
          Employees by Department
        </CardTitle>
        <p className='text-xs font-medium tracking-wider text-muted-foreground uppercase'>
          Current Org Structure
        </p>
      </CardHeader>
      <CardContent className='flex-1 pb-0'>
        <div className='relative mx-auto aspect-square max-h-[200px] w-full'>
          <ResponsiveContainer width='100%' height='100%'>
            <PieChart>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className='rounded-lg border bg-white p-2 shadow-sm'>
                        <div className='flex items-center gap-2'>
                          <div
                            className='h-2 w-2 rounded-full'
                            style={{
                              backgroundColor: payload[0].payload.color,
                            }}
                          />
                          <span className='text-xs font-bold text-slate-700'>
                            {payload[0].name}: {payload[0].value}%
                          </span>
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Pie
                data={data}
                dataKey='value'
                nameKey='name'
                innerRadius={65} // Tạo lỗ hổng ở giữa (Donut)
                outerRadius={90}
                paddingAngle={5}
                strokeWidth={0}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Center Text: 1,248 Employees */}
          <div className='pointer-events-none absolute inset-0 flex flex-col items-center justify-center'>
            <span className='text-3xl leading-none font-black text-slate-900'>
              2,548
            </span>
            <span className='mt-1 text-[10px] font-bold text-slate-400 uppercase'>
              Employees
            </span>
          </div>
        </div>

        {/* Chú thích (Legend) tùy biến để đẹp hơn mặc định */}
        <div className='grid grid-cols-2 gap-2 pb-6'>
          {data.map((item) => (
            <div key={item.name} className='flex items-center gap-2'>
              <div
                className='h-2 w-2 rounded-full'
                style={{ backgroundColor: item.color }}
              />
              <span className='text-xs font-medium text-slate-600'>
                {item.name}
              </span>
              <span className='ml-auto text-xs font-bold text-slate-400'>
                {item.value}%
              </span>
            </div>
          ))}
        </div>
      </CardContent>

      <CardFooter className='flex-col gap-2 border-t pt-4 text-sm'>
        <div className='flex items-center gap-2 leading-none font-bold text-emerald-600'>
          <TrendingUp className='h-4 w-4' />
          +5.2% headcount growth{' '}
          <span className='font-normal text-slate-400'>this quarter</span>
        </div>
      </CardFooter>
    </Card>
  )
}
