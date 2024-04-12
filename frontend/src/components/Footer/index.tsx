import { useNavigate } from 'react-router-dom'
import { FooterContainer } from './styles'

import Home from '../../assets/images/home.svg'
import HomeOP from '../../assets/images/homeOP.svg'
import Ghost from '../../assets/images/ghost.svg'
import GhostOP from '../../assets/images/ghostOP.svg'
import Profile from '../../assets/images/user.svg'
import ProfileOP from '../../assets/images/userOP.svg'
import Logout from '../../assets/images/logout.svg'
import Lupa from '../../assets/images/lupa.svg'
import LupaOP from '../../assets/images/lupaOP.svg'

import { Buser } from '../../types'
import { useAuth } from '../../contexts/authContext'

export type Props = {
  page: 'timeline' | 'buus' | 'profile' | 'search'
}

const Footer = ({ page }: Props) => {
  const navigate = useNavigate()
  const { logout } = useAuth()
  const loggedBuser = JSON.parse(localStorage.getItem('buser') || '{}') as Buser

  //Links
  const goHome = () => {
    navigate('/')
    window.scrollTo(0, 0)
  }

  const goBuu = () => {
    navigate('/buus')
    window.scrollTo(0, 0)
  }

  const goProfile = () => {
    navigate(`/${loggedBuser?.username}`)
    window.scrollTo(0, 0)
  }

  const goSearch = () => {
    navigate(`/search`)
    window.scrollTo(0, 0)
  }

  //FimLinks

  return (
    <FooterContainer>
      <div className="buttons">
        <button className="PageButton" onClick={goHome}>
          {page === 'timeline' ? (
            <>
              <img src={HomeOP} alt="Home" />
            </>
          ) : (
            <>
              <img src={Home} alt="Home" />
            </>
          )}
        </button>

        <button className="PageButton" onClick={goBuu}>
          {page === 'buus' ? (
            <>
              <img src={GhostOP} alt="Buus" />
            </>
          ) : (
            <>
              <img src={Ghost} alt="Buus" />
            </>
          )}
        </button>

        <button className="PageButton" onClick={goProfile}>
          {page === 'profile' ? (
            <>
              <img src={ProfileOP} alt="Perfil" />
            </>
          ) : (
            <>
              <img src={Profile} alt="Perfil" />
            </>
          )}
        </button>

        <button className="PageButton" onClick={goSearch}>
          {page === 'search' ? (
            <>
              <img src={LupaOP} alt="Pesquisa" />
            </>
          ) : (
            <>
              <img src={Lupa} alt="Pesquisa" />
            </>
          )}
        </button>

        <button className="logout PageButton" onClick={logout}>
          <img src={Logout} alt="Sair" />
        </button>
      </div>
    </FooterContainer>
  )
}

export default Footer
