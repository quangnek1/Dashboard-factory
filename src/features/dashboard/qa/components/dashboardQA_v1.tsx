import { 
  ShieldCheck, 
  AlertCircle, 
  FileSearch, 
  ThermometerSun, 
  CheckCircle2,
  Clock
} from 'lucide-react'
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  Cell,
  PieChart,
  Pie
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { HRStatCard } from '../../components/ADM/HRStatCard'

// Dữ liệu Pareto: Top nguyên nhân lỗi (NG)
const paretoData = [
  { reason: 'Dimension', count: 45 },
  { reason: 'Surface', count: 28 },
  { reason: 'Contamination', count: 15 },
  { reason: 'Packaging', count: 7 },
  { reason: 'Others', count: 5 },
]

// Dữ liệu Audit ISO (Dựa trên nội dung bạn cung cấp)
const auditObservations = [
  { id: 'Ob01', area: 'AIH', issue: 'Thiếu quy định dán mã thiết bị ME', status: 'Open', severity: 'Medium' },
  { id: 'Ob02', area: 'AIH', issue: 'Thiếu số EB2 trên Bonding Jig', status: 'Resolved', severity: 'High' },
  { id: 'Ob03', area: 'AIH', issue: 'Cảnh báo an toàn máy Laser', status: 'In-progress', severity: 'High' },
  { id: 'Ob04', area: 'AIH', issue: 'Hiển thị Grade phòng sạch', status: 'Open', severity: 'Low' },
  { id: 'Ob05', area: 'Filmecc', issue: 'Truy xuất hồ sơ đào tạo AIH-Filmecc', status: 'Open', severity: 'Medium' },
]

export default function DashboardQA_v1() {
  return (
  <>
   {/* KPI Cards: Tập trung vào FPY và Tuân thủ */}
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        <HRStatCard title="First Pass Yield (FPY)" value="98.5%" delta="+0.2%" isTrendUp={true} subText="Target: >98%" icon={CheckCircle2} />
        <HRStatCard title="NG Rate" value="1.2%" delta="+0.1%" isTrendUp={true} isNegativeTrend={true} subText="No Good units rate" icon={AlertCircle} />
        <HRStatCard title="CAPA Status" value="5/12" delta="7 closed" isTrendUp={true} subText="Open vs Total CAPA" icon={ShieldCheck} />
        <HRStatCard title="Environment (Cleanroom)" value="Stable" delta="22°C / 45%" isTrendUp={true} subText="Temp & Humidity OK" icon={ThermometerSun} />
      </div>

      <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
        {/* Pareto Chart: Nguyên nhân lỗi chính */}
        <Card className='col-span-1 lg:col-span-4'>
          <CardHeader>
            <CardTitle>Top Defect Reasons (Pareto)</CardTitle>
            <CardDescription>Major causes of non-conformity in production</CardDescription>
          </CardHeader>
          <CardContent className='h-[350px]'>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={paretoData}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="reason" axisLine={false} tickLine={false} fontSize={12} />
                <YAxis axisLine={false} tickLine={false} fontSize={12} />
                <Tooltip cursor={{ fill: '#f8fafc' }} />
                <Bar dataKey="count" radius={[4, 4, 0, 0]} barSize={40}>
                  {paretoData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#f43f5e' : '#6366f1'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Audit Summary Pie: Phân bổ lỗi Audit */}
        <Card className='col-span-1 lg:col-span-3'>
          <CardHeader>
            <CardTitle>ISO Audit Observation Status</CardTitle>
            <CardDescription>Audit Sensome 9-11 Feb 2026</CardDescription>
          </CardHeader>
          <CardContent className='flex flex-col items-center justify-center h-[350px]'>
            <div className='relative h-64 w-full'>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Resolved', value: 1, fill: '#10b981' },
                      { name: 'In-progress', value: 1, fill: '#f59e0b' },
                      { name: 'Open', value: 3, fill: '#f43f5e' },
                    ]}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className='absolute inset-0 flex flex-col items-center justify-center'>
                <span className='text-3xl font-black text-slate-900'>6</span>
                <span className='text-[10px] font-bold text-slate-400 uppercase'>Total Obs</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ISO Audit Action Tracking: Theo dõi chi tiết các Observation */}
      <Card>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <CardTitle className='flex items-center gap-2'>
              <FileSearch className='w-5 h-5 text-indigo-500' /> ISO Observation Tracking List
            </CardTitle>
            <Badge variant="outline">Evaluation: Sensome (Feb 2026)</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader className='bg-slate-50/50'>
              <TableRow>
                <TableHead className='w-[80px] font-bold'>ID</TableHead>
                <TableHead className='w-[100px] font-bold'>Area</TableHead>
                <TableHead className='font-bold'>Issue Description</TableHead>
                <TableHead className='font-bold'>Severity</TableHead>
                <TableHead className='text-right font-bold'>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {auditObservations.map((obs) => (
                <TableRow key={obs.id}>
                  <TableCell className='font-bold text-slate-500'>{obs.id}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className='bg-slate-100'>{obs.area}</Badge>
                  </TableCell>
                  <TableCell className='text-sm text-slate-600 font-medium'>{obs.issue}</TableCell>
                  <TableCell>
                    <div className='flex items-center gap-1.5'>
                      <div className={`h-2 w-2 rounded-full ${
                        obs.severity === 'High' ? 'bg-rose-500' : 
                        obs.severity === 'Medium' ? 'bg-amber-500' : 'bg-blue-500'
                      }`} />
                      <span className='text-xs'>{obs.severity}</span>
                    </div>
                  </TableCell>
                  <TableCell className='text-right'>
                    <Badge className={
                      obs.status === 'Resolved' ? 'bg-emerald-100 text-emerald-700' :
                      obs.status === 'In-progress' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
                    }>
                      {obs.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
  </>
  )
}