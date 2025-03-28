import { createContext, useContext, useState, useEffect } from 'react'

type UserRole = 'admin' | 'superAdmin' | 'operator' | null

interface AuthContextType {
    userRole: UserRole
    setUserRole: (role: UserRole) => void
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [userRole, setUserRole] = useState<UserRole>(null)
    const savedRole = localStorage.getItem('userRole') as UserRole
    console.log('userRolewef', userRole)

    useEffect(() => {
        if (savedRole) {
            setUserRole(savedRole)
        }
    }, [savedRole])

    const logout = () => {
        localStorage.removeItem('userRole')
        setUserRole(null)
    }

    return <AuthContext.Provider value={{ userRole, setUserRole, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
