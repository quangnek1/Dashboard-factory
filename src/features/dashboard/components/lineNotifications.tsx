import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { cn } from "@/lib/utils"

const lineNotifications = [
  {
    id: 'L01',
    lineName: 'Line 01 - Assembly',
    message: 'Line is back to normal operation',
    status: 'ok',
    time: 'Just now'
  },
  {
    id: 'L04',
    lineName: 'Line 04 - Packaging',
    message: 'Sensor failure detected at Station 2',
    status: 'error',
    time: '2 mins ago'
  },
  {
    id: 'L02',
    lineName: 'Line 02 - Testing',
    message: 'Emergency Stop pressed by Operator',
    status: 'error',
    time: '5 mins ago'
  },
  {
    id: 'L03',
    lineName: 'Line 03 - Coating',
    message: 'Maintenance completed successfully',
    status: 'ok',
    time: '12 mins ago'
  },
  {
    id: 'L05',
    lineName: 'Line 05 - Quality Control',
    message: 'Power supply fluctuation detected',
    status: 'warning',
    time: '18 mins ago'
  }
]

export function LineNotifications() {
  return (
    <div className='space-y-6'>
      {lineNotifications.map((notification, index) => (
        <div key={index} className='flex items-start gap-4'>
          <Avatar className={cn(
            'h-10 w-10 border-2',
            notification.status === 'error' ? 'border-red-500 bg-red-50' : 
            notification.status === 'warning' ? 'border-amber-500 bg-amber-50' : 
            'border-emerald-500 bg-emerald-50'
          )}>
            <AvatarFallback className={cn(
              'text-xs font-bold',
              notification.status === 'error' ? 'text-red-600' : 
              notification.status === 'warning' ? 'text-amber-600' : 
              'text-emerald-600'
            )}>
              {notification.id}
            </AvatarFallback>
          </Avatar>

          <div className='flex flex-1 flex-col gap-1'>
            <div className='flex items-center justify-between'>
              <p className='text-sm font-semibold leading-none'>{notification.lineName}</p>
              <span className='text-[10px] text-muted-foreground font-medium'>{notification.time}</span>
            </div>
            
            <p className={cn(
              'text-sm',
              notification.status === 'error' ? 'text-red-500 font-medium' : 'text-muted-foreground'
            )}>
              {notification.message}
            </p>

            <div className='mt-1'>
              <Badge 
                variant={notification.status === 'error' ? 'destructive' : 'secondary'}
                className={cn(
                  "text-[10px] px-1.5 py-0 h-5 leading-none",
                  notification.status === 'ok' && "bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none"
                )}
              >
                {notification.status.toUpperCase()}
              </Badge>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}