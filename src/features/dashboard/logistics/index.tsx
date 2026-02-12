import { 
  Box, Truck, CheckCircle2, DollarSign, Package, TrendingDown, Ship
} from 'lucide-react'
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ComposedChart, Bar, Line, Cell, PieChart, Pie
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { HRStatCard } from '../components/ADM/HRStatCard'
import { cn } from '@/lib/utils'

// Dữ liệu giả lập từ Mindmap của bạn
const inventoryData = [
  { month: 'Jan', stock: 4000, cost: 2400 },
  { month: 'Feb', stock: 3000, cost: 1398 },
  { month: 'Mar', stock: 2000, cost: 9800 },
  { month: 'Apr', stock: 2780, cost: 3908 },
  { month: 'May', stock: 1890, cost: 4800 },
  { month: 'Jun', stock: 2390, cost: 3800 },
]

const deliveryData = [
  { name: 'On-time', value: 92, fill: '#10b981' },
  { name: 'Delayed', value: 8, fill: '#f43f5e' },
]

export default function DashboardLogistics() {
  return (
    <div className='space-y-6'>
      {/* 4 Thẻ KPI chính */}
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        <HRStatCard title="Order Accuracy" value="99.2%" delta="+0.5%" isTrendUp={true} subText="Packing accuracy" icon={CheckCircle2} />
        <HRStatCard title="On-time Delivery" value="96.5%" delta="+2.1%" isTrendUp={true} subText="Delivery schedule" icon={Truck} />
        <HRStatCard title="Inventory Value" value="$1.2M" delta="-4.3%" isTrendUp={false} subText="Total stock value" icon={Box} />
        <HRStatCard title="Shipping Cost" value="$4.2/u" delta="+$0.3" isTrendUp={true} isNegativeTrend={true} subText="Avg. per unit" icon={DollarSign} />
      </div>

      <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
        {/* Chart 1: Inventory vs Shipping Cost (Biểu đồ hỗn hợp) */}
        <Card className='col-span-1 lg:col-span-4 shadow-sm'>
          <CardHeader>
            <CardTitle>Inventory & Shipping Analysis</CardTitle>
            <CardDescription>Correlation between stock levels and transportation costs</CardDescription>
          </CardHeader>
          <CardContent className='h-[350px]'>
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={inventoryData} margin={{ left: -20 }}>
                <defs>
                  <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity={0.2} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} fontSize={12} />
                <YAxis axisLine={false} tickLine={false} fontSize={12} />
                <Tooltip cursor={{ fill: '#f8fafc' }} />
                <Bar name="Stock Level" dataKey="stock" fill="url(#barGrad)" radius={[4, 4, 0, 0]} barSize={30} />
                <Line name="Ship Cost ($)" type="monotone" dataKey="cost" stroke="#f97316" strokeWidth={3} dot={{ r: 4, fill: '#f97316' }} />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Chart 2: Delivery Performance (Donut Chart) */}
        <Card className='col-span-1 lg:col-span-3 shadow-sm'>
          <CardHeader>
            <CardTitle>Delivery Performance</CardTitle>
            <CardDescription>On-time vs Delayed shipments</CardDescription>
          </CardHeader>
          <CardContent className='flex flex-col items-center justify-center h-[350px]'>
            <div className="relative h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={deliveryData} innerRadius={70} outerRadius={90} paddingAngle={8} dataKey="value">
                    {deliveryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-black text-slate-900">92%</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase">On-Time</span>
              </div>
            </div>
            <div className='flex gap-4 mt-2'>
                <div className='flex items-center gap-1.5 text-xs font-medium text-slate-500'>
                    <div className='w-2 h-2 rounded-full bg-emerald-500' /> On-time
                </div>
                <div className='flex items-center gap-1.5 text-xs font-medium text-slate-500'>
                    <div className='w-2 h-2 rounded-full bg-rose-500' /> Delayed
                </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 3. Bảng Inventory Alerts */}
      <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
        <Card className='shadow-sm border-slate-200'>
            <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                    <Package className='w-5 h-5 text-indigo-500' /> Stock Aging Alert
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader className='bg-slate-50/50'>
                        <TableRow>
                            <TableHead className='font-bold'>Material ID</TableHead>
                            <TableHead className='font-bold'>Aging (Days)</TableHead>
                            <TableHead className='font-bold text-right'>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {[
                            { id: 'RM-992', days: 120, status: 'Critical' },
                            { id: 'RM-441', days: 85, status: 'Warning' },
                            { id: 'FG-102', days: 45, status: 'Monitoring' },
                        ].map((item) => (
                            <TableRow key={item.id}>
                                <TableCell className='font-medium'>{item.id}</TableCell>
                                <TableCell>
                                    <div className='flex items-center gap-2'>
                                        <div className='flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden'>
                                            <div className='h-full bg-indigo-500' style={{ width: `${(item.days/150)*100}%` }} />
                                        </div>
                                        <span className='text-xs font-bold text-slate-500'>{item.days}d</span>
                                    </div>
                                </TableCell>
                                <TableCell className='text-right'>
                                    <Badge variant={item.status === 'Critical' ? 'destructive' : 'secondary'} className='text-[10px]'>
                                        {item.status.toUpperCase()}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>

        {/* Chart 3: Shipping by Mode (Trực quan hóa chi phí) */}
        <Card className='shadow-sm border-slate-200'>
            <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                    <Ship className='w-5 h-5 text-blue-500' /> Logistics Mode Distribution
                </CardTitle>
            </CardHeader>
            <CardContent className='flex items-center justify-center h-[200px]'>
                {/* Bạn có thể thêm một BarChart ngang ở đây để thể hiện % Air/Sea/Road */}
                <div className='w-full space-y-4'>
                    {[{ mode: 'Sea Freight', p: 65, c: 'bg-blue-500' }, { mode: 'Air Freight', p: 25, c: 'bg-sky-400' }, { mode: 'Road', p: 10, c: 'bg-slate-300' }].map(m => (
                        <div key={m.mode} className='space-y-1'>
                            <div className='flex justify-between text-xs font-bold'>
                                <span className='text-slate-600'>{m.mode}</span>
                                <span className='text-slate-400'>{m.p}%</span>
                            </div>
                            <div className='h-2 bg-slate-100 rounded-full overflow-hidden'>
                                <div className={cn("h-full rounded-full", m.c)} style={{ width: `${m.p}%` }} />
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  )
}