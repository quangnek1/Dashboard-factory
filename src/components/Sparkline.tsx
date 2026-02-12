import { LineChart, Line } from 'recharts'
import { ArrowUp, ArrowDown } from 'lucide-react'

type SparklineProps = {
  data: { value: number }[]
  width?: number
  height?: number
}

export function Sparkline({
  data,
  width = 80,
  height = 32,
}: SparklineProps) {
  if (data.length < 2) return null

  const first = data[0].value
  const last = data[data.length - 1].value
  const diffPercent = ((last - first) / first) * 100
  const isUp = diffPercent >= 0

  return (
    <div className="flex items-center gap-2">
      <LineChart width={width} height={height} data={data}>
        <Line
          dataKey="value"
          stroke={isUp ? '#22c55e' : '#ef4444'}
          strokeWidth={2}
          dot={false}
          isAnimationActive={false}
        />
      </LineChart>

      <div
        className={`flex items-center text-xs font-medium ${
          isUp ? 'text-green-500' : 'text-red-500'
        }`}
      >
        {isUp ? (
          <ArrowUp className="h-3 w-3" />
        ) : (
          <ArrowDown className="h-3 w-3" />
        )}
        {Math.abs(diffPercent).toFixed(1)}%
      </div>
    </div>
  )
}
