import { NavLink } from 'react-router-dom'
import { ChevronLeft, ChevronRight, LayoutDashboard } from 'lucide-react'
import { Button } from '../ui/button'
import { Home, Archive, BarChart2, Users, DollarSign, Key, FileText, Building2, Calculator } from 'lucide-react'
import { Vote } from 'lucide-react'

const menuItems = {
    admin: [
        { path: '/home', label: 'Главная', icon: <Home /> },
        { path: '/archive', label: 'Архив', icon: <Archive /> },
        { path: '/girlsStatistics', label: 'Статистика по девушкам', icon: <BarChart2 /> },
        { path: '/operatorStatistics', label: 'Статистика по операторам', icon: <Users /> },
        { path: '/financeReport', label: 'Расходы и доходы', icon: <DollarSign /> }
    ],
    superAdmin: [
        { path: '/accessControl', label: 'Доступы', icon: <Vote /> },
        { path: '/adminReport', label: 'Отчет администратора', icon: <FileText /> },
        { path: '/operatorReport', label: 'Отчет оператора', icon: <FileText /> },
        { path: '/branches', label: 'Филиал и ветки', icon: <Building2 /> }
    ],
    operator: [{ path: '/apartmentCalculation', label: 'Расчет кв.', icon: <Calculator /> }]
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
                                    <span className='mr-2'>{item.icon}</span>
                                    {isSidebarOpen && item.label}
                                </NavLink>
                            </li>
                        ))}
                </ul>
            </nav>
        </div>
    )
}
