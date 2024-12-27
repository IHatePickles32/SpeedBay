<<<<<<< HEAD
const App = () => {
  return (
    <div>
      <h1>SpeedBay</h1>
    </div>
  );
};

export default App;
=======
import { Routes, Route, Link } from 'react-router-dom'
import LoginPage from './pages/LoginPage'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">EMS Navigator</h1>
          <div className="space-x-4">
            <Link to="/login" className="text-blue-600 hover:text-blue-800">Login</Link>
            <Link to="/register" className="text-blue-600 hover:text-blue-800">Register</Link>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<div>Register Page (coming soon)</div>} />
        <Route path="/" element={
          <div className="container mx-auto mt-8 px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Welcome to EMS Navigator</h1>
            <p className="text-gray-600">Please login or register to continue</p>
          </div>
        } />
      </Routes>
    </div>
  )
}

export default App
>>>>>>> 8af061e1f551ff1c92401f2bec1a5a59c6bb3f84
