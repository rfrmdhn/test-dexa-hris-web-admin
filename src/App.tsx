import { Routes, Route } from 'react-router-dom'
import { Card } from '@/components/atoms/Card'

function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8 flex items-center justify-center">
      <Routes>
        <Route path="/" element={
          <Card className="max-w-md w-full">
            <h1 className="text-2xl font-bold text-primary mb-4">Web Admin Scaffolding</h1>
            <p className="text-gray-600 dark:text-gray-300">
              Project structure initialized successfully.
            </p>
          </Card>
        } />
      </Routes>
    </div>
  )
}

export default App
