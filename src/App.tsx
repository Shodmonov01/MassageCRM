import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'

import { AuthProvider } from './context/login-context'
import AppRoutes from './routes/app-routes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <Router>
                    <AppRoutes />
                </Router>
            </AuthProvider>
        </QueryClientProvider>
    )
}

export default App
