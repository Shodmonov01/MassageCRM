import { Navigate, Outlet } from 'react-router-dom'

// const roleDefaultRoutes: Record<string, string> = {
//     admin: '/home',
//     superAdmin: '/accessControl',
//     operator: '/apartmentCalculation'
// }

const ProtectedRoute = ({ allowedRoles }: { allowedRoles: string[] }) => {
    // const role = localStorage.getItem('role') as keyof typeof roleDefaultRoutes

    // const defaultRoute = roleDefaultRoutes[role]

    // if (window.location.pathname === '/') {
    //     return <Navigate to={defaultRoute} replace />
    // }

    return <Outlet />
}

export default ProtectedRoute
