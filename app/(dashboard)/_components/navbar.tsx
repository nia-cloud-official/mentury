import { NavbarRoutes } from "./navbar-routes"
import { MobileSidebar } from "./sidebar/mobile-sidebar"

export const Navbar = async () => {
    return (
        <div className="p-4 h-full flex items-center backdrop-blur-md shadow-sm border-b border-neutral-900">
            <MobileSidebar />
            <NavbarRoutes />
        </div>
    )
}