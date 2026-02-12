import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts'

const data = [
  { day: 'Mon', plan: 780, actual: 920 },
  { day: 'Tue', plan: 820, actual: 980 },
  { day: 'Wed', plan: 800, actual: 870 },
  { day: 'Thu', plan: 760, actual: 820 },
  { day: 'Fri', plan: 800, actual: 880 },
  { day: 'Sat', plan: 720, actual: 860 },
  { day: 'Sun', plan: 700, actual: 840 },
]

export function AnalyticsChart() {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F97316" stopOpacity={0.35} />
            <stop offset="100%" stopColor="#F97316" stopOpacity={0} />
          </linearGradient>

          <linearGradient id="planGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#14B8A6" stopOpacity={0.35} />
            <stop offset="100%" stopColor="#14B8A6" stopOpacity={0} />
          </linearGradient>
        </defs>

        <CartesianGrid vertical={false} strokeOpacity={0.15} />

        <XAxis
          dataKey="day"
          tickLine={false}
          axisLine={false}
          fontSize={12}
        />
        <YAxis tickLine={false} axisLine={false} fontSize={12} />

        <Tooltip
          contentStyle={{
            borderRadius: 8,
            border: '1px solid #e5e7eb',
            fontSize: 12,
          }}
        />

        {/* Actual Output - trên */}
        <Area
          type="monotone"
          dataKey="actual"
          stroke="#F97316"
          strokeWidth={2}
          fill="url(#actualGradient)"
        />

        {/* Planned Output - dưới */}
        <Area
          type="monotone"
          dataKey="plan"
          stroke="#14B8A6"
          strokeWidth={2}
          fill="url(#planGradient)"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
