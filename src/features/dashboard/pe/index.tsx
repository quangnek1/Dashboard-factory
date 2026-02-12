
import { 
  Settings, 
  Wrench, 
  Zap, 
  ClipboardCheck,
  TrendingUp,
  AlertTriangle
} from 'lucide-react'
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  BarChart,
  Bar,
  Cell
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { HRStatCard } from '../components/ADM/HRStatCard'


// Dữ liệu giả lập dựa trên mindmap của bạn
const reliabilityData = [
  { week: 'W1', mtbf: 120, mttr: 4.2 },
  { week: 'W2', mtbf: 132, mttr: 3.8 },
  { week: 'W3', mtbf: 125, mttr: 4.5 },
  { week: 'W4', mtbf: 145, mttr: 3.2 },
]

const kaizenData = [
  { group: 'Production', completed: 12, target: 15 },
  { group: 'Production Engineering', completed: 18, target: 15 },
  { group: 'QA', completed: 8, target: 10 },
  { group: 'AIX', completed: 15, target: 15 },
]

const ecrList = [
  { id: 'ECR-2601025', content: 'Modify Jig for Line 1', status: 'On-track', deadline: '2026-02-20', owner: 'Nguyen A' },
  { id: 'ECR-2508017', content: 'Update APS Standard v2', status: 'Delayed', deadline: '2026-02-12', owner: 'Tran B' },
  { id: 'ECR-2512058', content: 'Validation New Machine', status: 'On-track', deadline: '2026-03-01', owner: 'Le C' },
  { id: 'ECR-2511095', content: 'Validation New Machine', status: 'On-track', deadline: '2026-03-01', owner: 'Le C' },
  { id: 'ECR-2602012', content: 'Validation New Machine', status: 'On-track', deadline: '2026-03-01', owner: 'Le C' },
]

const productionEngineering = () => {
  return (
   <div className='space-y-6'>
      {/* 1. KPI Cards - Maintenance & Improvement Focus */}
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        <HRStatCard
          title="Machine Running Rate"
          value="94.2%"
          delta="+2.1%"
          isTrendUp={true}
          subText="Current operational status"
          icon={Settings}
        />
        <HRStatCard
          title="Repair Rate"
          value="88.5%"
          delta="+5.2%"
          isTrendUp={true}
          subText="Resolved/Total requests"
          icon={Wrench}
        />
        <HRStatCard
          title="Monthly Kaizen"
          value="53"
          delta="+8"
          isTrendUp={true}
          subText="Total improvements"
          icon={Zap}
        />
        <HRStatCard
          title="APS Update Progress"
          value="76%"
          delta="-2%"
          isTrendUp={false}
          isNegativeTrend={true}
          subText="Standards compliance"
          icon={ClipboardCheck}
        />
      </div>

      <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
        {/* 2. Reliability Trend (MTBF & MTTR) */}
        <Card className='col-span-1 lg:col-span-4 shadow-sm'>
          <CardHeader>
            <CardTitle>Equipment Reliability Trend</CardTitle>
            <CardDescription>Tracking MTBF (Higher is better) and MTTR (Lower is better)</CardDescription>
          </CardHeader>
          <CardContent className='h-[350px]'>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={reliabilityData} margin={{ left: -20 }}>
                <defs>
                  <linearGradient id="colorMtbf" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="week" axisLine={false} tickLine={false} fontSize={12} />
                <YAxis axisLine={false} tickLine={false} fontSize={12} />
                <Tooltip />
                <Area 
                  name="MTBF (Hrs)" 
                  type="monotone" 
                  dataKey="mtbf" 
                  stroke="#6366f1" 
                  strokeWidth={3}
                  fill="url(#colorMtbf)" 
                />
                <Area 
                  name="MTTR (Hrs)" 
                  type="monotone" 
                  dataKey="mttr" 
                  stroke="#f43f5e" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  fill="transparent" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* 3. Kaizen by Group */}
        <Card className='col-span-1 lg:col-span-3 shadow-sm'>
          <CardHeader>
            <CardTitle>Kaizen Performance</CardTitle>
            <CardDescription>Completed vs Target by Technical Group</CardDescription>
          </CardHeader>
          <CardContent className='h-[350px]'>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={kaizenData} layout="vertical" margin={{ left: 20 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="group" type="category" axisLine={false} tickLine={false} fontSize={12} />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="completed" fill="#10b981" radius={[0, 4, 4, 0]} barSize={20}>
                  {kaizenData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.completed >= entry.target ? '#10b981' : '#f97316'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* 4. ECR Tracking Table */}
      <Card className='shadow-sm'>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <div>
              <CardTitle>ECR & Validation Tracking</CardTitle>
              <CardDescription>Engineering Change Requests and machine validation status</CardDescription>
            </div>
            <Badge variant="outline" className='flex items-center gap-1 font-bold'>
              <AlertTriangle className='w-3 h-3 text-amber-500' /> 2 Delayed Tasks
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader className='bg-slate-50/50'>
              <TableRow>
                <TableHead className='font-bold'>ECR ID</TableHead>
                <TableHead className='font-bold'>Content</TableHead>
                <TableHead className='font-bold'>Status</TableHead>
                <TableHead className='font-bold'>Deadline</TableHead>
                <TableHead className='text-right font-bold'>Owner</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ecrList.map((ecr) => (
                <TableRow key={ecr.id} className='hover:bg-slate-50/50 transition-colors'>
                  <TableCell className='font-medium'>{ecr.id}</TableCell>
                  <TableCell className='text-slate-600'>{ecr.content}</TableCell>
                  <TableCell>
                    <Badge variant={ecr.status === 'Delayed' ? 'destructive' : 'secondary'} className='text-[10px] font-bold'>
                      {ecr.status.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell className='text-slate-500 text-sm'>{ecr.deadline}</TableCell>
                  <TableCell className='text-right font-medium text-indigo-600'>{ecr.owner}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default productionEngineering
