import { NavLink } from 'react-router-dom'
import { ChevronLeft, ChevronRight, LayoutDashboard, Settings } from 'lucide-react'
import { Button } from '../ui/button'

const menuItems = {
    admin: [
        { path: '/home', label: 'Главная' },
        { path: '/archive', label: 'Архив' },
        { path: '/girlsStatistics', label: 'Статистика по девушкам' },
        { path: '/operatorStatistics', label: 'Статистика по операторам' },
        { path: '/financeReport', label: 'Расходы и доходы' }
    ],
    superAdmin: [
        { path: '/accessControl', label: 'Доступы' },
        { path: '/adminReport', label: 'Отчет администратора' },
        { path: '/operatorReport', label: 'Отчет оператора' },
        { path: '/branches', label: 'Филиал и ветки' }
    ],
    operator: [{ path: '/apartmentCalculation', label: 'Расчет кв.' }]
}

export function Sidebar({
    isSidebarOpen,
    toggleSidebar,
    role
}: {
    isSidebarOpen: boolean
    toggleSidebar: () => void
    role: 'admin' | 'superAdmin' | 'operator' | null
}) {
    return (
        <div className={`bg-white h-full p-4 transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
            <div className='flex justify-between items-center mb-6'>
                <h2 className={`text-xl font-bold ${isSidebarOpen ? '' : 'hidden'}`}>Dashboard</h2>
                <Button variant='ghost' size='icon' onClick={toggleSidebar}>
                    {isSidebarOpen ? <ChevronLeft /> : <ChevronRight />}
                </Button>
            </div>
            <nav>
                <ul className='space-y-2'>
                    {role &&
                        menuItems[role].map(item => (
                            <li key={item.path}>
                                <NavLink
                                    to={item.path}
                                    className={({ isActive }) =>
                                        `flex items-center p-2 rounded-lg ${
                                            isActive ? 'bg-gray-100' : 'hover:bg-gray-50'
                                        }`
                                    }
                                >
                                    <LayoutDashboard className='mr-2' />
                                    {isSidebarOpen && item.label}
                                </NavLink>
                            </li>
                        ))}
                </ul>
            </nav>
        </div>
    )
}
