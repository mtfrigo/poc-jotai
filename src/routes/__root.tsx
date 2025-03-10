import { NavigationMenu, NavigationMenuItem, NavigationMenuList, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'
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
            <Link to="/"  >
                Console
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem className={navigationMenuTriggerStyle()}>
            <Link to="/logs"  >
                Logs
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    )
  }
   