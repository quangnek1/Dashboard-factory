import { 
  ShieldCheck, AlertCircle, CheckCircle2, ThermometerSun, 
  FileSearch, Activity, Microscope, Scale 
} from 'lucide-react'
import { 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Cell, LineChart, Line, RadarChart, PolarGrid, 
  PolarAngleAxis, Radar, Legend, ComposedChart
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { HRStatCard } from '../../components/ADM/HRStatCard'

// 1. Dữ liệu Radar: Đánh giá tuân thủ ISO 13485
const complianceData = [
  { subject: 'Documentation', A: 95, full: 100 },
  { subject: 'Training', A: 85, full: 100 },
  { subject: 'Maintenance', A: 70, full: 100 }, // Cần chú ý theo Ob01, Ob02
  { subject: 'Environment', A: 98, full: 100 },
  { subject: 'Validation', A: 65, full: 100 }, // Ob06 chỉ ra lỗi Validation
  { subject: 'Safety/5S', A: 75, full: 100 },   // Ob03, Ob04
]

// 2. Dữ liệu Mix: FPY Trend & NG Count
const qualityTrend = [
  { month: 'Sep', fpy: 97.2, ng: 120 },
  { month: 'Oct', fpy: 98.1, ng: 95 },
  { month: 'Nov', fpy: 96.5, ng: 150 },
  { month: 'Dec', fpy: 98.5, ng: 80 },
  { month: 'Jan', fpy: 99.0, ng: 45 },
]

export default function DashboardQAV2() {
  return (
    <div className='space-y-6 pb-10'>
      {/* Khối KPI cao cấp */}
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        <HRStatCard title="Overall FPY" value="99.0%" delta="+0.5%" isTrendUp={true} subText="First Pass Yield" icon={ShieldCheck} />
        <HRStatCard title="Active CAPA" value="04" delta="-2" isTrendUp={false} subText="Pending actions" icon={Activity} />
        <HRStatCard title="Supplier Quality" value="99.7%" delta="+0.1%" isTrendUp={true} subText="IQC Pass Rate" icon={Scale} />
        <HRStatCard title="ISO Findings" value="06" delta="New Ob" isTrendUp={true} isNegativeTrend={true} subText="Sensome Audit" icon={FileSearch} />
      </div>

      <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
        {/* Chart 1: FPY Trend vs NG Count (Composed) */}
        <Card className='col-span-1 lg:col-span-4 shadow-md border-none bg-slate-50/50'>
          <CardHeader>
            <CardTitle className="text-indigo-900">Quality Performance Trend</CardTitle>
            <CardDescription>Correlation between FPY % and total NG units</CardDescription>
          </CardHeader>
          <CardContent className='h-[350px]'>
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={qualityTrend} margin={{ left: -20 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} fontSize={12} />
                <YAxis yAxisId="left" axisLine={false} tickLine={false} fontSize={12} domain={[90, 100]} />
                <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} fontSize={12} />
                <Tooltip />
                <Legend verticalAlign="top" align="right" />
                <Bar yAxisId="right" name="NG Units" dataKey="ng" fill="#94a3b8" opacity={0.3} barSize={40} radius={[4, 4, 0, 0]} />
                <Line yAxisId="left" name="FPY %" type="monotone" dataKey="fpy" stroke="#6366f1" strokeWidth={4} dot={{ r: 6, fill: '#6366f1' }} />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Chart 2: ISO Compliance Radar */}
        <Card className='col-span-1 lg:col-span-3 shadow-md border-none'>
          <CardHeader>
            <CardTitle>ISO 13485 Compliance Radar</CardTitle>
            <CardDescription>Based on Feb 2026 Audit Findings</CardDescription>
          </CardHeader>
          <CardContent className='h-[350px] flex justify-center'>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={complianceData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" fontSize={11} fontWeight={600} />
                <Radar name="Current Status" dataKey="A" stroke="#f43f5e" fill="#f43f5e" fillOpacity={0.5} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
        {/* Chart 3: Defect Distribution (Pareto) */}
        <Card className='shadow-sm border-slate-200'>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Non-Conformity Distribution</CardTitle>
              <CardDescription>Pareto Analysis for Kaizen priority</CardDescription>
            </div>
            <Microscope className="w-5 h-5 text-slate-400" />
          </CardHeader>
          <CardContent className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { name: 'Dim', val: 45 }, { name: 'Surface', val: 25 }, 
                { name: 'Clean', val: 15 }, { name: 'Pack', val: 10 }, { name: 'Etc', val: 5 }
              ]}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={11} />
                <Tooltip cursor={{fill: '#f8fafc'}} />
                <Bar dataKey="val" radius={[4, 4, 4, 4]} barSize={35}>
                  {[0,1,2,3,4].map((i) => (
                    <Cell key={i} fill={i === 0 ? '#f43f5e' : '#cbd5e1'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Chart 4: Environment Monitoring (Real-time Feel) */}
        <Card className='shadow-sm border-slate-200 bg-gradient-to-br from-white to-indigo-50/30'>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ThermometerSun className="w-5 h-5 text-amber-500" /> 
              Cleanroom Environment (Grade B)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-around items-center pt-4">
              <div className="text-center">
                <p className="text-xs font-bold text-slate-400 uppercase">Temperature</p>
                <p className="text-4xl font-black text-slate-900">22.4°C</p>
                <Badge className="bg-emerald-100 text-emerald-700 mt-2">Optimal</Badge>
              </div>
              <div className="w-px h-16 bg-slate-200" />
              <div className="text-center">
                <p className="text-xs font-bold text-slate-400 uppercase">Humidity</p>
                <p className="text-4xl font-black text-slate-900">48%</p>
                <Badge className="bg-emerald-100 text-emerald-700 mt-2">Optimal</Badge>
              </div>
            </div>
            <div className="pt-2">
              <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-1">
                <span>PARTICLE COUNT (≥0.5µm)</span>
                <span>3,200 / 3,520 (Limit)</span>
              </div>
              <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500" style={{ width: '85%' }} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}