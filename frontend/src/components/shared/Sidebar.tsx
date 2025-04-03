import { NavLink, useNavigate } from 'react-router-dom'

import { ChevronLeft, ChevronRight, LogOut } from 'lucide-react'
import { Home, BarChart2, Users, FileText, Building2, Calculator } from 'lucide-react'
import { Vote } from 'lucide-react'
import { Package } from 'lucide-react'
import { Wallet } from 'lucide-react'

import { Button } from '../ui/button'

const menuItems = {
    admin: [
        { path: '/home', label: 'Главная', icon: <Home /> },
        { path: '/archive', label: 'Архив', icon: <Package /> },
        { path: '/girlsStatistics', label: 'Статистика по девушкам', icon: <BarChart2 /> },
        { path: '/operatorStatistics', label: 'Статистика по операторам', icon: <Users /> },
        { path: '/financeReport', label: 'Расходы и доходы', icon: <Wallet /> }
    ],
    super_admin: [
        { path: '/accessControl', label: 'Доступы', icon: <Vote /> },
        { path: '/adminReport', label: 'Отчет администратора', icon: <FileText /> },
        { path: '/operatorReport', label: 'Отчет оператора', icon: <FileText /> },
        { path: '/branches', label: 'Филиал и ветки', icon: <Building2 /> }
    ],
    operator: [{ path: '/apartmentCalculation', label: 'Расчет кв.', icon: <Calculator /> }]
}

export function Sidebar({ isSidebarOpen, toggleSidebar }: { isSidebarOpen: boolean; toggleSidebar: () => void }) {
    const navigate = useNavigate()

    const role = localStorage.getItem('role') as keyof typeof menuItems

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        navigate('/login')
    }

    return (
        <div className={`bg-white h-full p-4 transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
            <div className='flex justify-between items-center mb-6'>
                <h2 className={`text-xl font-bold ${isSidebarOpen ? '' : 'hidden'}`}>Dashboard</h2>
                <Button variant='ghost' size='icon' onClick={toggleSidebar}>
                    {isSidebarOpen ? <ChevronLeft /> : <ChevronRight />}
                </Button>
            </div>
            <div className='flex flex-col flex-1 justify-between h-[90%] '>
                <nav>
                    <ul className='space-y-2'>
                        {menuItems[role].map(item => (
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
                <div>
                    <Button onClick={logout} variant='ghost' className={'p-0'}>
                        <span className='mr-2'>
                            <LogOut />
                        </span>
                        {isSidebarOpen && 'Выход'}
                    </Button>
                </div>
            </div>
        </div>
    )
}
