import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


export function Overview() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Statistics</h2>
          <p>Here you can display various statistics...</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <p>Display recent user activity or notifications here...</p>
          <Button>button</Button>
          <Input></Input>
        </div>
      </div>
    </div>
  )
}

