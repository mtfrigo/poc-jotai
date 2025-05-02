import { NavigationMenu, NavigationMenuItem, NavigationMenuList, navigationMenuTriggerStyle } from '@/shared/ui/primitives//navigation-menu'
import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: () => (
    <div className="w-screen h-screen flex">
      <NavigationMenuDemo  />
        <Outlet />
      <TanStackRouterDevtools />
    </div>
  ),
})

export function NavigationMenuDemo() {
    return (
      <NavigationMenu className='absolute top-2 left-1/2 transform -translate-x-1/2 '>
        <NavigationMenuList>
          <NavigationMenuItem className={navigationMenuTriggerStyle()}>
            <Link to="/console"  >
                Console
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem className={navigationMenuTriggerStyle()}>
            <Link to="/logs"  >
                Logs
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem className={navigationMenuTriggerStyle()}>
            <Link to="/teams"  >
                Times
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    )
  }
   