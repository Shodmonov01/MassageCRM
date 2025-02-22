import { useState } from "react"

import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
import { Sidebar } from "./components/shared/Sidebar"
import { Overview } from "./pages/Overview"
import { Settings } from "./pages/Settings"

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <main className={`flex-1 p-8 transition-all duration-300 ${isSidebarOpen ? "ml-2" : "ml-2"}`}>
          <Routes>
            <Route path="/" element={<Navigate to="/overview" replace />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
