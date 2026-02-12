import { Check, Languages } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
// Giả sử bạn dùng i18next, nếu dùng thư viện khác hãy thay đổi hook tương ứng
import { useTranslation } from 'react-i18next' 

export function LanguageSwitch() {
  const { i18n } = useTranslation()

  // Danh sách ngôn ngữ hỗ trợ cho nhà máy Nhật Bản
  const languages = [
    { code: 'vi', label: 'Tiếng Việt', flag: '🇻🇳' },
    { code: 'ja', label: '日本語', flag: '🇯🇵' },
    { code: 'en', label: 'English', flag: '🇺🇸' },
  ]

  const currentLanguage = i18n.language || 'vi'

  const handleLanguageChange = (code: string) => {
    i18n.changeLanguage(code)
    // Lưu vào localStorage để giữ ngôn ngữ khi reload trang
    localStorage.setItem('i18nextLng', code)
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon' className='scale-95 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800'>
          <Languages className='size-[1.2rem] text-slate-600 dark:text-slate-400' />
          <span className='sr-only'>Switch Language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className="w-40">
        {languages.map((lang) => (
          <DropdownMenuItem 
            key={lang.code} 
            onClick={() => handleLanguageChange(lang.code)}
            className="cursor-pointer flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <span className="text-base">{lang.flag}</span>
              <span className={cn(currentLanguage === lang.code ? "font-bold" : "font-medium")}>
                {lang.label}
              </span>
            </div>
            <Check
              size={14}
              className={cn('ms-auto text-emerald-600', currentLanguage !== lang.code && 'hidden')}
            />
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}