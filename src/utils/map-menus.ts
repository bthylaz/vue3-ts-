import { RouteRecordRaw } from 'vue-router'
import { IBreadcrumb } from '@/base-ui/breadcrumb/src'
let firstMenu: any = null
export function mapMenusToRouters(userMenus: any[]): RouteRecordRaw[] {
  const routers: RouteRecordRaw[] = []

  const allRouters: RouteRecordRaw[] = []

  // 1.获取所有的映射关系
  const fileRouter = require.context('../router/main', true, /\.ts/)
  // console.log(fileRouter.keys())
  fileRouter.keys().forEach((item) => {
    const router = require('../router/main' + item.split('.')[1])
    allRouters.push(router.default)
  })

  // 2.根据菜单获取需要添加的routes
  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        //在全部映射中匹配
        const route = allRouters.find((item) => {
          return item.path === menu.url
        })
        if (route) {
          routers.push(route)
        }
        if (!firstMenu) firstMenu = menu
      } else {
        _recurseGetRoute(menu.children)
      }
    }
  }
  _recurseGetRoute(userMenus)

  return routers
}
export function pathMapBreadcrumbs(userMenus: any[], currentPath: string) {
  const breadcrumbs: IBreadcrumb[] = []
  pathMapToMenu(userMenus, currentPath, breadcrumbs)
  return breadcrumbs
}
export function pathMapToMenu(
  userMenus: any[],
  currentPath: string,
  breadcrumbs?: IBreadcrumb[]
): any {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
      if (findMenu) {
        breadcrumbs?.push({ name: menu.name })
        breadcrumbs?.push({ name: findMenu.name })
        return findMenu
      }
    } else {
      if (currentPath === menu.url && menu.type === 2) {
        return menu
      }
    }
  }
}

export { firstMenu }
