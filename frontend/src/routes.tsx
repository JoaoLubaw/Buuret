import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Timeline from './pages/Timeline'
import Profile from './pages/Profile'
import MyBuus from './pages/MyBuus'
import RetDetail from './pages/RetDetail'

const Rotas = () => (
  <Routes>
    <Route path="/" element={<Home />}></Route>
    <Route path="/tl" element={<Timeline />}></Route>
    <Route path="/profile" element={<Profile />}></Route>
    <Route path="/buus" element={<MyBuus />}></Route>
    <Route path="/ret" element={<RetDetail />}></Route>
  </Routes>
)

export default Rotas
