import { NavbarRoutes } from "./navbar-routes"
import { MobileSidebar } from "./sidebar/mobile-sidebar"
import { getAuthSession } from "@/lib/auth"
import { UserAvatar } from "./user/user-avatar"

export const Navbar = async () => {
    const session = await getAuthSession()
    return (
        <div className="p-4 h-full flex items-center backdrop-blur-md shadow-sm">
            <MobileSidebar />
            <NavbarRoutes />
        </div>
    )
}