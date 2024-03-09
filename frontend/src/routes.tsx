import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Timeline from './pages/Timeline'
import Profile from './pages/Profile'
import MyBuus from './pages/MyBuus'
import RetDetail from './pages/RetDetail'

const Private = ({ Item }: { Item: React.ComponentType }) => {
  const signed = false

  return signed ? <Item /> : <Home />
}

const Rotas = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/home" element={<Private Item={Timeline} />} />
    <Route path="/profile" element={<Private Item={Profile} />} />
    <Route path="/buus" element={<Private Item={MyBuus} />} />
    <Route path="/ret" element={<Private Item={RetDetail} />} />
  </Routes>
)

export default Rotas
