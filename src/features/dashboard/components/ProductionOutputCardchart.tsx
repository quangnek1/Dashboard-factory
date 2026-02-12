import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from 'recharts'

const outputData = [
  { day: 'Mon', actual: 780, target: 800 },
  { day: 'Tue', actual: 820, target: 800 },
  { day: 'Wed', actual: 860, target: 800 },
  { day: 'Thu', actual: 800, target: 800 },
  { day: 'Fri', actual: 840, target: 800 },
  { day: 'Sat', actual: 580, target: 500 },
]

export function ProductionOutputCard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center bg-white p-6 rounded-2xl border shadow-sm">
      {/* Left stats - Cải thiện UI thẻ chỉ số */}
      <div className="space-y-4">
        <div className="rounded-xl border border-emerald-100 bg-emerald-50/30 p-5 transition-all hover:shadow-md">
          <p className="text-sm font-medium text-emerald-700">Actual Output</p>
          <div className="flex items-baseline gap-2 mt-1">
            <p className="text-3xl font-bold tracking-tight text-slate-900">4,680</p>
            <span className="text-sm font-semibold text-slate-500">pcs</span>
          </div>
          <p className="text-xs font-bold text-emerald-600 mt-2 flex items-center">
            <span className="mr-1">↑</span> 6.2% <span className="ml-1 font-normal text-slate-400">vs last week</span>
          </p>
        </div>

        <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-5 transition-all hover:shadow-md">
          <p className="text-sm font-medium text-slate-500">Planned vs Actual</p>
          <p className="text-2xl font-bold text-indigo-600 mt-1">+180 <span className="text-sm font-normal text-slate-400 ml-1">pcs</span></p>
          <div className="mt-3 w-full bg-slate-200 rounded-full h-1.5">
            <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: '85%' }}></div>
          </div>
          <p className="text-[10px] text-slate-400 mt-2 uppercase font-bold tracking-wider">Target: 4,500 pcs</p>
        </div>
      </div>

      {/* Chart - Làm sạch và thêm hiệu ứng */}
      <div className="col-span-2 h-[280px] w-full pt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={outputData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="outputGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity={1} />
                <stop offset="100%" stopColor="#34d399" stopOpacity={0.8} />
              </linearGradient>
            </defs>
            
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f1f5f9" />
            
            <XAxis 
              dataKey="day" 
              tickLine={false} 
              axisLine={false} 
              fontSize={12} 
              tick={{ fill: '#94a3b8' }}
              dy={10}
            />
            
            <YAxis 
              tickLine={false} 
              axisLine={false} 
              fontSize={11} 
              tick={{ fill: '#cbd5e1' }}
            />
            
            <Tooltip 
              cursor={{ fill: '#f8fafc', radius: 8 }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border bg-white p-3 shadow-xl border-slate-100">
                      <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">{payload[0].payload.day}</p>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        <p className="text-sm font-bold text-slate-700">
                          {payload[0].value?.toLocaleString()} <span className="font-normal text-slate-400 text-xs ml-0.5">pcs</span>
                        </p>
                      </div>
                    </div>
                  )
                }
                return null
              }}
            />
            
            <Bar 
              dataKey="actual" 
              fill="url(#outputGradient)"
              radius={[6, 6, 6, 6]}
              barSize={32}
              animationDuration={1500}
            >
              {outputData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.actual < 600 ? '#f43f5e' : 'url(#outputGradient)'} // Đổi màu đỏ nếu sản lượng quá thấp (sự cố)
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <p className="text-center text-[10px] text-slate-400 font-medium uppercase tracking-[0.2em] mt-2">
          Production Timeline - Feb 2026
        </p>
      </div>
    </div>
  )
}