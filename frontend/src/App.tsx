import { BrowserRouter } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'

import { GlobalCss } from './styles'
import Rotas from './routes'
import { ToastContainer } from 'react-toastify'
import { BuserProvider } from './contexts/authContext'

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <BuserProvider>
          <GlobalCss />
          <Rotas />
        </BuserProvider>
      </BrowserRouter>
    </>
  )
}

export default App
