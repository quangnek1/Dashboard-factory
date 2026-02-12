import React from 'react'
import {
  Factory,
  ShieldCheck,
  Settings,
  Truck,
  AlertTriangle,
  Activity,
  TrendingUp,
} from 'lucide-react'
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  Line,
  ComposedChart,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
} from 'recharts'
import { EmployeeDistribution } from '@/features/dashboard/components/ADM/employeeDistribution'

// Dữ liệu giữ nguyên theo logic nhà máy của bạn
const performanceTrend = [
  { name: 'Mon', output: 4000, fpy: 98.2 },
  { name: 'Tue', output: 3000, fpy: 97.5 },
  { name: 'Wed', output: 5000, fpy: 99.1 },
  { name: 'Thu', output: 2780, fpy: 96.8 },
  { name: 'Fri', output: 4890, fpy: 98.5 },
  { name: 'Sat', output: 2390, fpy: 99.3 },
  { name: 'Sun', output: 3490, fpy: 98.0 },
]

const maintenanceRadar = [
  { subject: 'Maintenance', A: 120 },
  { subject: 'Calibration', A: 98 },
  { subject: 'Training', A: 86 },
  { subject: 'Safety', A: 99 },
  { subject: 'Validation', A: 85 },
]

const HomeDashboard = () => {
  return (
    // Sử dụng bg-background và text-foreground để tự động ăn theo Dark Theme
    <div className='min-h-screen space-y-6 bg-background p-6 text-foreground transition-colors duration-300'>
      
      {/* Header KPI Section */}
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
        {/* OEE Card - Giữ Gradient vì nó hiển thị tốt trên cả 2 nền */}
        <div className='relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-700 p-6 text-white shadow-lg transition-transform hover:scale-[1.01]'>
          <Factory className='absolute top-[-10px] right-[-10px] h-24 w-24 opacity-20' />
          <p className='text-sm font-medium uppercase opacity-80'>Overall Equipment Efficiency (OEE)</p>
          <h2 className='mt-2 text-4xl font-bold'>78.5%</h2>
          <div className='mt-4 flex items-center text-sm font-semibold text-emerald-300'>
            <TrendingUp className='mr-1 h-4 w-4' /> +9% vs target
          </div>
        </div>

        {/* Safety Days Card */}
        <div className='relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 p-6 text-white shadow-lg transition-transform hover:scale-[1.01]'>
          <ShieldCheck className='absolute top-[-10px] right-[-10px] h-24 w-24 opacity-20' />
          <p className='text-sm font-medium uppercase opacity-80'>Number of safety days</p>
          <h2 className='mt-2 text-4xl font-bold'>258 days</h2>
          <div className='mt-4 flex items-center text-sm font-semibold'>Target 365 days</div>
        </div>

        {/* MTBF Card - Chuyển sang bg-card */}
        <div className='flex items-center justify-between rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-all'>
          <div>
            <p className='text-xs font-bold tracking-wider text-muted-foreground uppercase'>MTBF (Reliability)</p>
            <h3 className='mt-1 text-2xl font-bold'>145h</h3>
            <p className='mt-1 text-xs font-bold text-rose-500'>↓ 5h vs last shift</p>
          </div>
          <div className='rounded-xl bg-blue-50 dark:bg-blue-900/20 p-3'>
            <Settings className='h-6 w-6 text-blue-600' />
          </div>
        </div>

        {/* Inventory Alert Card */}
        <div className='flex items-center justify-between rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-all'>
          <div>
            <p className='text-xs font-bold tracking-wider text-muted-foreground uppercase'>Critical Stock Alerts</p>
            <h3 className='mt-1 text-2xl font-bold text-rose-600'>12 Items</h3>
            <p className='mt-1 text-xs text-muted-foreground italic'>Action required in Purchase</p>
          </div>
          <div className='rounded-xl bg-rose-50 dark:bg-rose-900/20 p-3'>
            <AlertTriangle className='h-6 w-6 text-rose-600' />
          </div>
        </div>
      </div>

      {/* Main Charts Section */}
      <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
        {/* Output & Quality Trend */}
        <div className='rounded-2xl border border-border bg-card p-6 shadow-sm lg:col-span-2'>
          <div className='mb-6'>
            <h3 className='text-lg font-bold'>Production Output & Quality Trend</h3>
            <p className='text-sm font-medium text-muted-foreground italic'>Weekly volume and defect correlation</p>
          </div>
          <div className='h-80 w-full'>
            <ResponsiveContainer width='100%' height='100%'>
              <ComposedChart data={performanceTrend}>
                <CartesianGrid strokeDasharray='3 3' vertical={false} className="stroke-muted" opacity={0.4} />
                <XAxis dataKey='name' axisLine={false} tickLine={false} fontSize={12} tick={{ fill: 'currentColor', opacity: 0.6 }} />
                <YAxis axisLine={false} tickLine={false} fontSize={12} tick={{ fill: 'currentColor', opacity: 0.6 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '12px', color: 'hsl(var(--foreground))' }}
                  itemStyle={{ fontSize: '12px' }}
                />
                <Area type='monotone' dataKey='output' fill='hsl(var(--primary))' fillOpacity={0.1} stroke='#6366f1' strokeWidth={2} />
                <Line type='monotone' dataKey='fpy' stroke='#10b981' strokeWidth={3} dot={{ r: 4 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Dept Distribution */}
        <div className='rounded-2xl border border-border bg-card p-0 shadow-sm overflow-hidden'>
          <EmployeeDistribution />
        </div>
      </div>

      {/* Bottom Section */}
      <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
        {/* Logistics Status */}
        <div className='rounded-2xl border border-border bg-card p-6 shadow-sm'>
          <h4 className='mb-4 flex items-center gap-2 font-bold'>
            <Truck className='h-5 w-5 text-indigo-500' /> Logistics Status
          </h4>
          <div className='space-y-4'>
            <div className='flex items-center justify-between text-sm font-bold'>
              <span className='text-muted-foreground'>On-time Delivery</span>
              <span className='text-emerald-600'>96.5%</span>
            </div>
            <div className='h-2 w-full overflow-hidden rounded-full bg-muted'>
              <div className='h-full w-[96.5%] bg-emerald-500 transition-all duration-1000' />
            </div>
            <div className='flex items-center justify-between pt-2 text-sm font-bold'>
              <span className='text-muted-foreground'>Order Accuracy</span>
              <span className='text-indigo-600'>99.2%</span>
            </div>
            <div className='h-2 w-full overflow-hidden rounded-full bg-muted'>
              <div className='h-full w-[99.2%] bg-indigo-500 transition-all duration-1000' />
            </div>
          </div>
        </div>

        {/* Recent Quality Issues (QA) */}
        <div className='rounded-2xl border border-border bg-card p-6 shadow-sm'>
          <h4 className='mb-4 flex items-center gap-2 font-bold'>
            <Activity className='h-5 w-5 text-rose-500' /> Critical Quality Issues
          </h4>
          <div className='space-y-3'>
            {[
              { id: 'NG-442', msg: 'Surface Scratch - Line A', time: '10m ago' },
              { id: 'NG-443', msg: 'Dimension Error - Line C', time: '25m ago' },
            ].map((issue) => (
              <div key={issue.id} className='flex items-center justify-between rounded-xl border border-border bg-muted/50 p-3 hover:bg-muted transition-colors'>
                <div>
                  <p className='text-xs font-black text-rose-600 uppercase'>{issue.id}</p>
                  <p className='text-xs font-bold'>{issue.msg}</p>
                </div>
                <span className='text-[10px] font-bold text-muted-foreground'>{issue.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Maintenance Radar (PE) */}
        <div className='rounded-2xl border border-border bg-card p-6 shadow-sm'>
          <h4 className='mb-4 flex items-center gap-2 font-bold'>
            <Settings className='h-5 w-5 text-blue-500' /> Maintenance Compliance
          </h4>
          <div className='h-48 w-full'>
            <ResponsiveContainer width='100%' height='100%'>
              <RadarChart cx='50%' cy='50%' outerRadius='80%' data={maintenanceRadar}>
                <PolarGrid className="stroke-muted" />
                <PolarAngleAxis dataKey='subject' fontSize={10} fontWeight={800} tick={{ fill: 'currentColor' }} />
                <Radar name='Status' dataKey='A' stroke='#6366f1' fill='#6366f1' fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeDashboard