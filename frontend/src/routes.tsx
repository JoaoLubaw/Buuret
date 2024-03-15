import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Timeline from './pages/Timeline'
import Profile from './pages/Profile'
import MyBuus from './pages/MyBuus'
import RetDetail from './pages/RetDetail'
import ProtectedRoute from './routesProtected'

const Rotas = () => (
  <Routes>
    <Route path="/login" element={<Home />} />
    <Route
      path="/"
      element={
        <ProtectedRoute>
          <Timeline />
        </ProtectedRoute>
      }
    />
    <Route
      path="/:username"
      element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      }
    />
    <Route
      path="/buus"
      element={
        <ProtectedRoute>
          <MyBuus />
        </ProtectedRoute>
      }
    />
    <Route
      path="/ret"
      element={
        <ProtectedRoute>
          <RetDetail />
        </ProtectedRoute>
      }
    />
  </Routes>
)

export default Rotas
