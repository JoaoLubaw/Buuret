import { LeftContainer, RetButton } from './styles.'

import Logo from '../../assets/images/logoComTexto.png'
import Home from '../../assets/images/home.svg'
import Ghost from '../../assets/images/ghost.svg'
import Profile from '../../assets/images/user.svg'
import Test from '../../assets/images/teste.jpg'

export type Props = {
  openPopMakeRet: () => void
  page: 'timeline' | 'buus' | 'profile'
}

const LeftSidebar = ({ openPopMakeRet, page }: Props) => {
  return (
    <LeftContainer>
      <img className="logo" src={Logo} alt="Buuret" />
      <div className="buttons">
        <button className="PageButton">
          <img src={Home} alt="Home" />
          <span className={page === 'timeline' ? 'active' : ''}>
            Página Inicial
          </span>
        </button>

        <button className="PageButton">
          <img src={Ghost} alt="Fantasma" />
          <span className={page === 'buus' ? 'active' : ''}>Meus Buus</span>
        </button>

        <button className="PageButton">
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
          <img src={Test} alt="Imagem de perfil" />
          <div className="username">
            <h4>João Lubaw</h4>
            <span>@jaozinlubaw</span>
          </div>
        </div>
        <button>...</button>
      </div>
    </LeftContainer>
  )
}

export default LeftSidebar
