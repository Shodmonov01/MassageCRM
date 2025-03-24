import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from '@/context/login-context'

import ProtectedRoute from './protected-route'
import MainLayout from '@/components/shared/main-layout'

import AccessControl from '@/pages/super-admin/access-control'
import Home from '@/pages/admin/home'
import Archive from '@/pages/admin/archive'
import GirlsStatistics from '@/pages/admin/girls-statistics'
import OperatorStatistics from '@/pages/admin/operator-statistics'
import FinanceReport from '@/pages/admin/finance-report'
import AdminReport from '@/pages/super-admin/admin-report'
import OperatorReport from '@/pages/super-admin/operator-report'
import Branches from '@/pages/super-admin/branches'
import ApartmentCalculation from '@/pages/operator/apartment-calculation'
import Login from '@/pages/auth/login'

const AppRoutes = () => {
    const { userRole } = useAuth()
    console.log('userRole11', userRole)

    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route element={<ProtectedRoute allowedRoles={['admin']} userRole={userRole} />}>
                    <Route index element={<Navigate to='/home' replace />} />
                    <Route path='/home' element={<Home />} />
                    <Route path='/archive' element={<Archive />} />
                    <Route path='/girlsStatistics' element={<GirlsStatistics />} />
                    <Route path='/operatorStatistics' element={<OperatorStatistics />} />
                    <Route path='/financeReport' element={<FinanceReport />} />
                </Route>

                <Route element={<ProtectedRoute allowedRoles={['superAdmin']} userRole={userRole} />}>
                    <Route index element={<Navigate to='/accessControl' replace />} />
                    <Route path='/accessControl' element={<AccessControl />} />
                    <Route path='/adminReport' element={<AdminReport />} />
                    <Route path='/operatorReport' element={<OperatorReport />} />
                    <Route path='/branches' element={<Branches />} />
                </Route>

                <Route element={<ProtectedRoute allowedRoles={['operator']} userRole={userRole} />}>
                    <Route index element={<Navigate to='/apartmentCalculation' replace />} />
                    <Route path='/apartmentCalculation' element={<ApartmentCalculation />} />
                </Route>
            </Route>
            <Route path='/login' element={<Login />} />
        </Routes>
    )
}

export default AppRoutes
