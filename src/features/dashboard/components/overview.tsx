import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell
} from 'recharts'

const data = [
  { date: 'Mon', plan: 820, actual: 780 },
  { date: 'Tue', plan: 820, actual: 800 },
  { date: 'Wed', plan: 820, actual: 850 },
  { date: 'Thu', plan: 820, actual: 790 },
  { date: 'Fri', plan: 820, actual: 830 },
  { date: 'Sat', plan: 600, actual: 580 },
  { date: 'Sun', plan: 0, actual: 0 },
]

export function Overview() {
  return (
    <div className="h-[400px] w-full pt-4">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          {/* Định nghĩa Gradient cho Bar - Bí kíp để đẹp như video */}
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity={1} />
              <stop offset="100%" stopColor="#818cf8" stopOpacity={0.8} />
            </linearGradient>
          </defs>

          <CartesianGrid
            vertical={false}
            strokeDasharray="3 3"
            stroke="#f1f5f9" // slate-100 cực nhẹ
          />

          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            fontSize={12}
            tick={{ fill: '#94a3b8' }}
            dy={10}
          />

          <YAxis
            tickLine={false}
            axisLine={false}
            fontSize={12}
            tick={{ fill: '#94a3b8' }}
            tickFormatter={(value) => `${value}`}
          />

          <Tooltip
            cursor={{ fill: '#f8fafc', radius: 8 }}
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border bg-white p-3 shadow-xl">
                    <p className="mb-1 text-[11px] uppercase tracking-wider text-slate-400 font-bold">
                      {payload[0].payload.date}
                    </p>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-xs text-slate-600">Actual:</span>
                        <span className="text-xs font-bold text-indigo-600">{payload[0].value}</span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-xs text-slate-600">Plan:</span>
                        <span className="text-xs font-bold text-slate-400">{payload[1].value}</span>
                      </div>
                    </div>
                  </div>
                )
              }
              return null
            }}
          />

          {/* Cột Actual - Dùng Gradient và Radius lớn */}
          <Bar
            dataKey="actual"
            fill="url(#barGradient)"
            barSize={32}
            radius={[6, 6, 6, 6]} // Bo tròn cả trên dưới cho hiện đại
          />

          {/* Đường Plan - Mảnh và tinh tế */}
          <Line
            type="monotone"
            dataKey="plan"
            stroke="#cbd5e1" // slate-300
            strokeWidth={2}
            dot={false}
            strokeDasharray="5 5"
            animationDuration={1500}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}