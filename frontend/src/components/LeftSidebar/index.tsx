import { LeftContainer, RetButton } from './styles.'

import Logo from '../../assets/images/logoComTexto.png'
import Home from '../../assets/images/home.svg'
import Ghost from '../../assets/images/ghost.svg'
import Profile from '../../assets/images/user.svg'
import Logout from '../../assets/images/logout.svg'
import DefaultProfile from '../../assets/images/DefaultProfile.jpg'

import { useAuth } from '../../contexts/authContext'
import { useNavigate } from 'react-router-dom'

export type Props = {
  openPopMakeRet: () => void
  page: 'timeline' | 'buus' | 'profile'
}

const LeftSidebar = ({ openPopMakeRet, page }: Props) => {
  const { isLoggedIn, logout, buser } = useAuth()
  const navigate = useNavigate()

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
    navigate(`/${buser?.username}`)
    window.scrollTo(0, 0)
  }

  //FimLinks

  return (
    <LeftContainer>
      <img className="logo" src={Logo} alt="Buuret" />
      <div className="buttons">
        <button className="PageButton" onClick={goHome}>
          <img src={Home} alt="Home" />
          <span className={page === 'timeline' ? 'active' : ''}>
            Página Inicial
          </span>
        </button>

        <button className="PageButton" onClick={goBuu}>
          <img src={Ghost} alt="Fantasma" />
          <span className={page === 'buus' ? 'active' : ''}>Meus Buus</span>
        </button>

        <button className="PageButton" onClick={goProfile}>
          <img src={Profile} alt="Perfil" />
          <span className={page === 'profile' ? 'active' : ''}>Perfil</span>
        </button>

        <RetButton
          onClick={() => {
            openPopMakeRet()
          }}
        >
          Ret-it
        </RetButton>
      </div>

      <div className="profile">
        <div className="profile-infos">
          <img
            src={buser?.profile ? buser.profile : DefaultProfile}
            alt="Imagem de perfil"
          />
          <div className="username">
            <h4>{buser?.name}</h4>
            <span>@{buser?.username}</span>
          </div>
        </div>
        <button className="logout" onClick={logout}>
          <img src={Logout} alt="Sair" />
        </button>
      </div>
    </LeftContainer>
  )
}

export default LeftSidebar
