import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Sparkline } from '@/components/Sparkline'
import { Analytics } from '../components/analytics'
import { LineNotifications } from '../components/lineNotifications'
import { Overview } from '../components/overview'

const DashboardProduction = () => {
  return (
    <>
      <Tabs
        orientation='vertical'
        defaultValue='overview'
        className='space-y-4'
      >
        <div className='w-full overflow-x-auto pb-2'>
          <TabsList>
            <TabsTrigger value='overview'>Factory Overview</TabsTrigger>
            <TabsTrigger value='analytics'>Analytics</TabsTrigger>
            <TabsTrigger value='reports' disabled>
              Production Report
            </TabsTrigger>
            <TabsTrigger value='notifications' disabled>
              Alerts
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value='overview' className='space-y-4'>
          <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Overall Equipment Effectiveness (%)
                </CardTitle>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke-width='1.5'
                  stroke='currentColor'
                  className='size-6'
                >
                  <path
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    d='m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z'
                  />
                </svg>
              </CardHeader>
              <CardContent>
                <div className='flex items-end justify-between'>
                  <div>
                    <div className='text-2xl font-bold'>OEE: 78.5%</div>
                    <p className='text-xs text-muted-foreground'>
                      from last month
                    </p>
                  </div>
                  <div>
                    <Sparkline data={oeeTrend} />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Output Today
                </CardTitle>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke-width='1.5'
                  stroke='currentColor'
                  className='size-6'
                >
                  <path
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    d='M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75'
                  />
                </svg>
              </CardHeader>
              <CardContent>
                <div className='flex items-end justify-between'>
                  <div>
                    <div className='text-2xl font-bold'>
                      <span className=''>+2350</span> pcs
                    </div>
                    <p className='text-xs text-muted-foreground'>
                      from yesterday
                    </p>
                  </div>
                  <div>
                    <Sparkline data={outputTrend} />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>Downtime</CardTitle>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke-width='1.5'
                  stroke='currentColor'
                  className='size-6'
                >
                  <path
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    d='M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                  />
                </svg>
              </CardHeader>
              <CardContent>
                <div className='flex items-end justify-between'>
                  <div>
                    <div className='text-2xl font-bold'>-35 min</div>
                    <p className='text-xs text-muted-foreground'>
                      from yesterday
                    </p>
                  </div>
                  <div>
                    <Sparkline data={downtimeTrend} />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Yield OK / NG Rate
                </CardTitle>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  className='h-4 w-4 text-muted-foreground'
                >
                  <path d='M22 12h-4l-3 9L9 3l-3 9H2' />
                </svg>
              </CardHeader>
              <CardContent>
                <div className='flex items-end justify-between'>
                  <div>
                    <div className='text-2xl font-bold'>+573</div>
                    <p className='text-xs text-muted-foreground'>
                      from yesterday
                    </p>
                  </div>
                  <div>
                    <Sparkline data={yieldTrend} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
            <Card className='col-span-1 lg:col-span-4'>
              <CardHeader>
                <CardTitle>Overview Actual Output vs Planned Output</CardTitle>
                <CardDescription>Week 1 - January 2026</CardDescription>
              </CardHeader>
              <CardContent className='ps-2'>
                <Overview />
              </CardContent>
              <CardFooter className='flex-col items-start gap-2 text-sm'>
                <div className='flex gap-2 leading-none font-medium'>
                  Trending up by 5.2% this month{' '}
                </div>
                <div className='leading-none text-muted-foreground'>
                  Showing total visitors for the last 6 months
                </div>
              </CardFooter>
            </Card>
            <Card className='col-span-1 lg:col-span-3'>
              <CardHeader>
                <CardTitle>Line Notifications</CardTitle>
                <CardDescription>
                  Update line information across the entire factory.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LineNotifications />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value='analytics' className='space-y-4'>
          <Analytics />
        </TabsContent>
      </Tabs>
    </>
  )
}

export default DashboardProduction

const oeeTrend = [{ value: 72 }, { value: 74 }, { value: 76 }, { value: 78.5 }]

const outputTrend = [
  { value: 520 },
  { value: 500 },
  { value: 540 },
  { value: 600 },
]
const downtimeTrend = [
  { value: 100.2 },
  { value: 98.5 },
  { value: 98.1 },
  { value: 98.9 },
]
const yieldTrend = [
  { value: 97.2 },
  { value: 98.5 },
  { value: 98.1 },
  { value: 98.9 },
]
