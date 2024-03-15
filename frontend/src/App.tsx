import { BrowserRouter } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'

import { GlobalCss } from './styles'
import Rotas from './routes'
import { ToastContainer } from 'react-toastify'
import { BuserProvider } from './contexts/authContext'
import { Provider } from 'react-redux'
import store from './store'

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <BuserProvider>
          <Provider store={store}>
            <GlobalCss />
            <Rotas />
          </Provider>
        </BuserProvider>
      </BrowserRouter>
    </>
  )
}

export default App
