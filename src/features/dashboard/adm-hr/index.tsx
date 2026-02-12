import { CalendarClock, UserMinus, UserPlus, Users } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Sparkline } from '@/components/Sparkline'
import { HRStatCard } from '../components/ADM/HRStatCard'
import { WorkforceTrendChart } from '../components/ADM/WorkforceTrendChart'
import { EmployeeDistribution } from '../components/ADM/employeeDistribution'
import { RecentHRActions } from '../components/ADM/recentHRActions'
import { LineNotifications } from '../components/lineNotifications'
import { Overview } from '../components/overview'

const DashboardADM = () => {
  return (
    <>
      <div className='space-y-4'>
        <div className='grid gap-2 sm:grid-cols-2 lg:grid-cols-2'>
          <div className='grid gap-2 sm:grid-cols-2 lg:grid-cols-2'>
            <HRStatCard
              title='Total Employees'
              value='2,548'
              delta='+12'
              isTrendUp={true}
              subText='Active employees'
              icon={Users}
            />
            <HRStatCard
              title='New Hires'
              value='36'
              delta='20.2%'
              isTrendUp={true}
              subText='Joined this period'
              icon={UserPlus}
            />
            <HRStatCard
              title='Resignations'
              value='14'
              delta='+3'
              isTrendUp={true}
              isNegativeTrend={true} // Tăng nghỉ việc là xấu (hiện màu đỏ)
              subText='Employees left'
              icon={UserMinus}
            />
            <HRStatCard
              title='On Leave Today'
              value='27'
              delta='+5'
              isTrendUp={true}
              subText='Approved leave'
              icon={CalendarClock}
            />
          </div>

          <div>
            <WorkforceTrendChart />
          </div>
        </div>
        <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
          <div className='col-span-1 lg:col-span-4'>
            <RecentHRActions />
          </div>
          <div className='col-span-1 lg:col-span-3'>
            <EmployeeDistribution />
          </div>
        </div>
      </div>
    </>
  )
}

export default DashboardADM
