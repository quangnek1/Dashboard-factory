import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const hrData = [
  { month: 'Jan', total: 2500, present: 2320 },
  { month: 'Feb', total: 2550, present: 2250 },
  { month: 'Mar', total: 2450, present: 2159 },
  { month: 'Apr', total: 2450, present: 2400 }, // Nghỉ lễ/nghỉ phép nhiều
  { month: 'May', total: 2600, present: 2200 },
  { month: 'Jun', total: 2550, present: 2365 },
]

export function WorkforceTrendChart() {
  return (
    <Card className="col-span-1 lg:col-span-3 shadow-sm border-slate-200">
      <CardHeader className="flex flex-row items-center justify-between pb-4 space-y-0">
        <div className="space-y-1">
          <CardTitle className="text-lg font-bold">Headcount & Attendance Trend</CardTitle>
          <p className="text-xs text-muted-foreground">Monthly workforce stability overview</p>
        </div>
        <Select defaultValue="year">
          <SelectTrigger className="w-[100px] h-8 text-xs">
            <SelectValue placeholder="Period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="month">Month</SelectItem>
            <SelectItem value="quarter">Quarter</SelectItem>
            <SelectItem value="year">Year</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="text-2xl font-bold text-slate-900">480</div>
          <p className="text-xs text-emerald-600 font-medium flex items-center">
            <span className="mr-1">▲</span> 3.2% <span className="ml-1 text-slate-400 font-normal text-[10px] uppercase">vs last quarter</span>
          </p>
        </div>
        
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={hrData}
              margin={{ top: 5, right: 5, left: -20, bottom: 5 }}
              barGap={8}
            >
              <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false} 
                fontSize={12} 
                tick={{ fill: '#94a3b8' }}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                fontSize={12} 
                tick={{ fill: '#94a3b8' }}
              />
              <Tooltip 
                cursor={{ fill: '#f8fafc' }}
                contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              />
              <Legend 
                verticalAlign="bottom" 
                align="center"
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ paddingTop: '20px', fontSize: '12px' }}
              />
              {/* Tổng số nhân viên - Màu xanh Indigo nhạt */}
              <Bar 
                name="Total Employees" 
                dataKey="total" 
                fill="#818cf8" 
                radius={[4, 4, 0, 0]} 
                barSize={20}
              />
              {/* Nhân viên có mặt - Màu Cam đặc trưng của dashboard gốc */}
              <Bar 
                name="Present Employees" 
                dataKey="present" 
                fill="#f97316" 
                radius={[4, 4, 0, 0]} 
                barSize={20}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}