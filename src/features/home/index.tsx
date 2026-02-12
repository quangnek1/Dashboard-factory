import { Outlet } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import HomeDashboard from './components/overview'
import { LanguageSwitch } from '@/components/language-switch'
import { useTranslation } from 'react-i18next';

export function Home() {
  const { t } = useTranslation();
  return (
    <>
      {/* ===== Top Heading ===== */}
      <Header>
        {/* <TopNav links={topNav} /> */}
        <Search />
        <div className='ms-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <LanguageSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </div>
      </Header>

      {/* ===== Main ===== */}
      <Main fluid>
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <h1 className='text-2xl font-bold tracking-tight'>{t('dashboard_title')}</h1>
          <div className='flex items-center space-x-2'>
            <Button>Download</Button>
          </div>
        </div>
        <HomeDashboard />
      </Main>
    </>
  )
}
