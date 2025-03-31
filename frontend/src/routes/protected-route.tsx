import { Navigate, Outlet } from 'react-router-dom'

const roleDefaultRoutes: Record<string, string> = {
    admin: '/home',
    superAdmin: '/accessControl',
    operator: '/apartmentCalculation'
}

const ProtectedRoute = ({
    allowedRoles,
    userRole
}: {
    allowedRoles: string[]
    userRole: 'admin' | 'super_admin' | 'operator' | null
}) => {
    console.log('userRole from useAuth:', userRole)
    const role = localStorage.getItem('role')

    // if (userRole === null) {
    //     return <div>Loading...</div>
    // }
    console.log('role from useAuth:', role)

    const defaultRoute = roleDefaultRoutes[role]

    if (window.location.pathname === '/') {
        return <Navigate to={defaultRoute} replace />
    }

    return <Outlet />
}

export default ProtectedRoute
