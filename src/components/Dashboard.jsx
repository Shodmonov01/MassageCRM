export function Dashboard({ activeTab, isSidebarOpen }) {
  return (
    <main className={`flex-1 p-8 transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-20"}`}>
      <h1 className="text-3xl font-bold mb-6">{activeTab === "overview" ? "Overview" : "Settings"}</h1>
      {activeTab === "overview" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Statistics</h2>
            <p>Here you can display various statistics...</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <p>Display recent user activity or notifications here...</p>
          </div>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">User Settings</h2>
          <p>Add user settings controls here...</p>
        </div>
      )}
    </main>
  )
}

