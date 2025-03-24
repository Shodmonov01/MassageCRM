import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'

import { AuthProvider } from './context/login-context'
import AppRoutes from './routes/app-routes'

function App() {
    return (
        <AuthProvider>
            <Router>
                <AppRoutes />
            </Router>
        </AuthProvider>
    )
}

export default App
