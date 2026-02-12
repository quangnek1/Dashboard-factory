import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const hrActions = [
  {
    employee: "Nguyen A",
    action: "New Hire",
    dept: "AIX",
    time: "30 min ago",
    note: "Probation",
    status: "success"
  },
  {
    employee: "Tran B",
    action: "Resigned",
    dept: "Prodcution",
    time: "2 hrs ago",
    note: "Personal",
    status: "destructive"
  },
  {
    employee: "Le C",
    action: "Leave Approved",
    dept: "PE",
    time: "Today",
    note: "Sick",
    status: "warning"
  },
  {
    employee: "Pham D",
    action: "Contract Updated",
    dept: "HR",
    time: "Yesterday",
    note: "Renewal",
    status: "info"
  },
   {
    employee: "Nguyen A",
    action: "New Hire",
    dept: "AIX",
    time: "30 min ago",
    note: "Probation",
    status: "success"
  },
  {
    employee: "Tran B",
    action: "Resigned",
    dept: "Prodcution",
    time: "2 hrs ago",
    note: "Personal",
    status: "destructive"
  },
  {
    employee: "Le C",
    action: "Leave Approved",
    dept: "PE",
    time: "Today",
    note: "Sick",
    status: "warning"
  },
  {
    employee: "Pham D",
    action: "Contract Updated",
    dept: "HR",
    time: "Yesterday",
    note: "Renewal",
    status: "info"
  },
]

export function RecentHRActions() {
  return (
    <Card className="col-span-1 lg:col-span-4 shadow-sm border-slate-200">
      <CardHeader>
        <CardTitle className="text-lg font-bold">Recent HR Actions</CardTitle>
        <CardDescription>Latest employee movements and status updates</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow>
              <TableHead className="w-[150px] font-bold">Employee</TableHead>
              <TableHead className="font-bold">Action</TableHead>
              <TableHead className="font-bold">Dept</TableHead>
              <TableHead className="font-bold">Time</TableHead>
              <TableHead className="text-right font-bold">Note</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {hrActions.map((item, index) => (
              <TableRow key={index} className="hover:bg-slate-50/50 transition-colors">
                <TableCell className="font-medium text-slate-900">{item.employee}</TableCell>
                <TableCell>
                  <Badge 
                    variant={item.status === "destructive" ? "destructive" : "secondary"}
                    className={cn(
                      "text-[10px] uppercase font-bold px-2 py-0",
                      item.status === "success" && "bg-emerald-100 text-emerald-700 hover:bg-emerald-100",
                      item.status === "warning" && "bg-amber-100 text-amber-700 hover:bg-amber-100",
                      item.status === "info" && "bg-blue-100 text-blue-700 hover:bg-blue-100"
                    )}
                  >
                    {item.action}
                  </Badge>
                </TableCell>
                <TableCell className="text-slate-500 font-medium">{item.dept}</TableCell>
                <TableCell className="text-slate-400 text-xs">{item.time}</TableCell>
                <TableCell className="text-right text-slate-600 italic text-sm">
                  {item.note}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}