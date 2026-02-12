import { Tabs } from '@radix-ui/react-tabs'
import { TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import DashboardQA_v1 from './components/dashboardQA_v1'
import DashboardQAV2 from './components/dashboardQA_v2'

export default function DashboardQA() {
  return (
    <Tabs orientation='vertical' defaultValue='QA v1' className='space-y-4'>
      <div className='w-full overflow-x-auto pb-2'>
        <TabsList>
          <TabsTrigger value='QA v1'>QA v1</TabsTrigger>
          <TabsTrigger value='QA v2'>QA v2</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value='QA v1' className='space-y-4'>
        <DashboardQA_v1 />
      </TabsContent>
       <TabsContent value='QA v2' className='space-y-4'>
        <DashboardQAV2 />
      </TabsContent>
    </Tabs>
  )
}
