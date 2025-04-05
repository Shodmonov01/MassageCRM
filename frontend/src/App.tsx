import { BrowserRouter as Router } from 'react-router-dom'

import AppRoutes from './routes/app-routes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5, // 5 daqiqa davomida ma'lumot eski hisoblanmaydi
            cacheTime: 1000 * 60 * 10, // 10 daqiqa davomida keshda qoladi
            refetchOnWindowFocus: false // Faqat sahifa fokuslanganida qayta so‘ralmasin
        }
    }
})

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
