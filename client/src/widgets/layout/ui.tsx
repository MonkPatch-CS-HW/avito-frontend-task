import { navigationMap } from '@/shared/model'
import { PropsWithChildren } from 'react'
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '@/shared/ui'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faPlusCircle, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'

export const Layout = ({ children }: PropsWithChildren) => {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const currentPageKey = Object.keys(navigationMap).find((key) => (navigationMap as any)[key] === pathname)
  const currentPageDescription = t(`page.${currentPageKey}.description`, '')
  const CustomMenuItem = ({ link, icon, label }: { link: string; label: string; icon?: IconDefinition }) => {
    return (
      <NavigationMenuItem>
        <Link to={link}>
          <NavigationMenuLink href={link} className="flex-row" asChild>
            <span className={pathname === link ? 'font-bold' : ''}>
              {icon && <FontAwesomeIcon icon={icon} className="mr-2" />}
              {label}
            </span>
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
    )
  }
  return (
    <>
      <header className="w-full container mx-auto">
        <NavigationMenu>
          <NavigationMenuList>
            <CustomMenuItem link={navigationMap.form} label={t('page.form.label')} icon={faPlusCircle} />
            <CustomMenuItem link={navigationMap.list} label={t('page.list.label')} icon={faList} />
          </NavigationMenuList>
        </NavigationMenu>
      </header>
      <div className="container mx-auto">
        <div className="title">{currentPageDescription && <h1 className="text-3xl">{currentPageDescription}</h1>}</div>
        <div className="contents">{children}</div>
      </div>
    </>
  )
}
