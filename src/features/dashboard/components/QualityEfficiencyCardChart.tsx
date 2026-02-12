import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts'

const qualityData = [
  { day: 'Mon', ok: 96, ng: 4 },
  { day: 'Tue', ok: 95, ng: 5 },
  { day: 'Wed', ok: 97, ng: 3 },
  { day: 'Thu', ok: 94, ng: 6 },
  { day: 'Fri', ok: 96, ng: 4 },
  { day: 'Sat', ok: 98, ng: 2 },
]

export function QualityEfficiencyCard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center bg-white p-6 rounded-2xl border shadow-sm">
      {/* Left stats - Thiết kế lại mang tính chuyên nghiệp */}
      <div className="space-y-4">
        <div className="rounded-xl border border-emerald-100 bg-emerald-50/20 p-5">
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">Yield Rate (OK)</p>
          <div className="flex items-baseline gap-1.5 mt-1">
            <p className="text-3xl font-black text-slate-900">96.4</p>
            <span className="text-lg font-bold text-emerald-600">%</span>
          </div>
          <div className="mt-2 flex items-center text-xs font-bold text-emerald-600">
            <div className="mr-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-100">↑</div>
            1.1% <span className="ml-1 font-normal text-slate-400 italic">vs last shift</span>
          </div>
        </div>

        <div className="rounded-xl border border-rose-100 bg-rose-50/30 p-5">
          <p className="text-xs font-bold uppercase tracking-wider text-rose-700">Defect Quantity (NG)</p>
          <div className="flex items-baseline gap-1.5 mt-1">
            <p className="text-3xl font-black text-rose-600">164</p>
            <span className="text-sm font-bold text-rose-400 uppercase">pcs</span>
          </div>
          <p className="text-[10px] font-medium text-slate-400 mt-2 uppercase">Total accumulated this week</p>
        </div>
      </div>

      {/* Chart - Area Chart Stacked chuyên nghiệp */}
      <div className="col-span-2 h-[280px] w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={qualityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorOk" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorNg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f1f5f9" />

            <XAxis 
              dataKey="day" 
              tickLine={false} 
              axisLine={false} 
              fontSize={12} 
              tick={{ fill: '#94a3b8', fontWeight: 500 }}
              dy={10}
            />

            <YAxis 
              tickLine={false} 
              axisLine={false} 
              fontSize={11} 
              tick={{ fill: '#cbd5e1' }}
              domain={[0, 100]}
            />

            <Tooltip
              cursor={{ stroke: '#e2e8f0', strokeWidth: 1 }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border bg-white p-3 shadow-2xl border-slate-100 min-w-[120px]">
                      <p className="text-[10px] font-black text-slate-400 uppercase mb-2 border-b pb-1">
                        {payload[0].payload.day} Status
                      </p>
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            <span className="text-[11px] text-slate-600">Yield OK:</span>
                          </div>
                          <span className="text-[11px] font-bold text-emerald-600">{payload[0].value}%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                            <span className="text-[11px] text-slate-600">Defect NG:</span>
                          </div>
                          <span className="text-[11px] font-bold text-rose-600">{payload[1].value}%</span>
                        </div>
                      </div>
                    </div>
                  )
                }
                return null
              }}
            />

            <Area
              type="monotone"
              dataKey="ok"
              stackId="1"
              stroke="#10b981"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorOk)"
              animationDuration={1500}
            />
            <Area
              type="monotone"
              dataKey="ng"
              stackId="1"
              stroke="#f43f5e"
              strokeWidth={2}
              strokeDasharray="4 4" // Đường NG đứt nét để phân biệt
              fillOpacity={1}
              fill="url(#colorNg)"
              animationDuration={2000}
            />
          </AreaChart>
        </ResponsiveContainer>
        <div className="flex justify-center gap-6 mt-4">
          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
            <div className="w-3 h-0.5 bg-emerald-500" /> Quality Yield
          </div>
          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
            <div className="w-3 h-0.5 bg-rose-500 border-dashed border-t" /> NG Rate
          </div>
        </div>
      </div>
    </div>
  )
}