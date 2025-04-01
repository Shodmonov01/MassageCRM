import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'

import AppRoutes from './routes/app-routes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <AppRoutes />
            </Router>
        </QueryClientProvider>
    )
}

export default App
