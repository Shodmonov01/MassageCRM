import { NavLink } from "react-router-dom"
import { ChevronLeft, ChevronRight, LayoutDashboard, Settings } from "lucide-react"
import { Button } from "./ui/button"

export function Sidebar({ isSidebarOpen, toggleSidebar }) {
  return (
    <div className={`bg-white h-full p-4 transition-all duration-300 ${isSidebarOpen ? "w-64" : "w-20"}`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className={`text-xl font-bold ${isSidebarOpen ? "" : "hidden"}`}>Dashboard</h2>
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          {isSidebarOpen ? <ChevronLeft /> : <ChevronRight />}
        </Button>
      </div>
      <nav>
        <ul className="space-y-2">
          <li>
            <NavLink
              to="/overview"
              className={({ isActive }) =>
                `flex items-center p-2 rounded-lg ${isActive ? "bg-gray-100" : "hover:bg-gray-50"}`
              }
            >
              <LayoutDashboard className="mr-2" />
              {isSidebarOpen && "Overview"}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                `flex items-center p-2 rounded-lg ${isActive ? "bg-gray-100" : "hover:bg-gray-50"}`
              }
            >
              <Settings className="mr-2" />
              {isSidebarOpen && "Settings"}
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  )
}

