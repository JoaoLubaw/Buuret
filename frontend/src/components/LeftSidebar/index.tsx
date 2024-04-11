import { useAuth } from '../../contexts/authContext'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { LeftContainer, RetButton } from './styles.'

import Logo from '../../assets/images/logoComTexto.png'
import Home from '../../assets/images/home.svg'
import HomeOP from '../../assets/images/homeOP.svg'
import Ghost from '../../assets/images/ghost.svg'
import GhostOP from '../../assets/images/ghostOP.svg'
import Profile from '../../assets/images/user.svg'
import ProfileOP from '../../assets/images/userOP.svg'
import Logout from '../../assets/images/logout.svg'
import Write from '../../assets/images/write.svg'
import DefaultProfile from '../../assets/images/DefaultProfile.jpg'

import { Buser } from '../../types'

export type Props = {
  openPopMakeRet: () => void
  page: 'timeline' | 'buus' | 'profile'
}

const LeftSidebar = ({ openPopMakeRet, page }: Props) => {
  const { logout } = useAuth()
  const navigate = useNavigate()

  //Resize
  const loggedBuser = JSON.parse(localStorage.getItem('buser') || '{}') as Buser
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768)

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  //Resize

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

  //FimLinks

  return (
    <LeftContainer>
      <img className="logo" src={Logo} alt="Buuret" />
      <div className="buttons">
        <button className="PageButton" onClick={goHome}>
          {page === 'timeline' ? (
            <>
              <img src={HomeOP} alt="Home" />
              <span className="active">Página Inicial</span>
            </>
          ) : (
            <>
              <img src={Home} alt="Home" />
              <span>Página Inicial</span>
            </>
          )}
        </button>

        <button className="PageButton" onClick={goBuu}>
          {page === 'buus' ? (
            <>
              <img src={GhostOP} alt="Buus" />
              <span className="active">Meus Buus</span>
            </>
          ) : (
            <>
              <img src={Ghost} alt="Buus" />
              <span>Meus Buus</span>
            </>
          )}
        </button>

        <button className="PageButton" onClick={goProfile}>
          {page === 'profile' ? (
            <>
              <img src={ProfileOP} alt="Home" />
              <span className="active">Perfil</span>
            </>
          ) : (
            <>
              <img src={Profile} alt="Home" />
              <span>Perfil</span>
            </>
          )}
        </button>

        {isSmallScreen ? (
          <>
            <RetButton
              onClick={() => {
                openPopMakeRet()
              }}
            >
              <img src={Write} alt="Ret-ir" />
            </RetButton>
          </>
        ) : (
          <RetButton
            onClick={() => {
              openPopMakeRet()
            }}
          >
            Ret-it
          </RetButton>
        )}
      </div>

      <div className="profile">
        <div className="profile-infos">
          <img
            src={loggedBuser?.profile ? loggedBuser.profile : DefaultProfile}
            alt="Imagem de perfil"
            className="avatar"
          />
          <div className="username">
            <h4>{loggedBuser?.name}</h4>
            <span>@{loggedBuser?.username}</span>
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
