import { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Sidebar } from './sidebar'

const MainLayout = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }

    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')

    useEffect(() => {
        if (!token) {
            navigate('/login')
        } else {
            if (location.pathname === '/') {
                if (role === 'admin') navigate('/home')
                if (role === 'super_admin') navigate('/accessControl')
                if (role === 'operator') navigate('/apartmentCalculation')
            }
        }
    }, [token])

    return (
        <div className='flex h-screen bg-gray-100'>
            <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            <main className={`flex-1 p-8 transition-all duration-300 ${isSidebarOpen ? 'ml-2' : 'ml-2'}`}>
                <Outlet />
            </main>
        </div>
    )
}

export default MainLayout
