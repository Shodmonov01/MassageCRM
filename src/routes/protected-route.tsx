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
    userRole: 'admin' | 'superAdmin' | 'operator' | null
}) => {
    console.log('userRole from useAuth:', userRole)

    if (userRole === null) {
        return <div>Loading...</div>
    }
    console.log('userRole from useAuth:', userRole)

    const defaultRoute = roleDefaultRoutes[userRole]

    if (window.location.pathname === '/') {
        return <Navigate to={defaultRoute} replace />
    }

    return <Outlet />
}

export default ProtectedRoute
