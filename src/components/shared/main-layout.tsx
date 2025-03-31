import { useState } from 'react'

import { useAuth } from '@/context/login-context'

import { Sidebar } from './Sidebar'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
    const { userRole } = useAuth()
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }

    console.log(userRole)

    return (
        <div className='flex h-screen bg-gray-100'>
            <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} role={userRole} />

            <main className={`flex-1 p-8 transition-all duration-300 ${isSidebarOpen ? 'ml-2' : 'ml-2'}`}>
                <Outlet />
            </main>
        </div>
    )
}

export default MainLayout
