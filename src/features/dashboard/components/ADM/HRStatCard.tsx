import { Card, CardContent } from "@/components/ui/card"
import { MoreHorizontal, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface HRStatCardProps {
  title: string
  value: string | number
  delta: string
  isTrendUp: boolean
  isNegativeTrend?: boolean // Nếu true: tăng là đỏ (như nghỉ việc), giảm là xanh
  subText: string
  icon: React.ElementType
  onViewReport?: () => void
}

export function HRStatCard({
  title,
  value,
  delta,
  isTrendUp,
  isNegativeTrend = false,
  subText,
  icon: Icon,
  onViewReport
}: HRStatCardProps) {
  
  // Logic màu sắc: 
  // Bình thường: Tăng là Xanh, Giảm là Đỏ
  // NegativeTrend (Nghỉ việc): Tăng là Đỏ, Giảm là Xanh
  const isGoodNews = isNegativeTrend ? !isTrendUp : isTrendUp;

  return (
    <Card className="shadow-sm border-slate-200">
      <CardContent >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-50 rounded-lg">
              <Icon className="w-5 h-5 text-indigo-600" />
            </div>
            <span className="text-sm font-bold text-slate-700">{title}</span>
          </div>
          <button className="text-slate-400 hover:text-slate-600">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-1">
          <h3 className="text-3xl font-black text-slate-900">{value}</h3>
          <div className="flex items-center gap-2">
            <div className={cn(
              "flex items-center text-xs font-bold",
              isGoodNews ? "text-emerald-600" : "text-rose-600"
            )}>
              {isTrendUp ? <ArrowUpRight className="w-3 h-3 mr-0.5" /> : <ArrowDownRight className="w-3 h-3 mr-0.5" />}
              {delta}
            </div>
            <span className="text-xs text-slate-400 font-medium">{subText}</span>
          </div>
        </div>

        <button 
          onClick={onViewReport}
          className="mt-6 flex items-center text-xs font-bold text-slate-900 hover:underline group"
        >
          View Report
          <ArrowUpRight className="ml-1 w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </CardContent>
    </Card>
  )
}