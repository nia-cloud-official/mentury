import { Logo } from "../logo"
import { SidebarRoutes } from "./sidebar-routes"

export const Sidebar = () => {
    return (
        <div className="h-full border-r border-neutral-900 flex flex-col overflow-y-auto shadow-sm">
            <div className="py-8 px-12">
                <Logo />
            </div>
            <div className="flex flex-col w-full">
                <SidebarRoutes />
            </div>
        </div>
    )
}