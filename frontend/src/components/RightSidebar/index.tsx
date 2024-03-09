import { RightSidebarContainer } from './styles'

import Lupa from '../../assets/images/lupa.svg'
import Test from '../../assets/images/teste.jpg'

const RightSidebar = () => {
  return (
    <RightSidebarContainer>
      <div className="content">
        <div className="search">
          <img src={Lupa} alt="Lupa" />
          <input type="text" />
        </div>

        <div className="followMore">
          <h2>Siga também</h2>

          <div className="user">
            <div className="profile-infos">
              <img src={Test} alt="Imagem de perfil" />
              <div className="username">
                <h4>João Lubaw</h4>
                <span>@jaozinlubaw</span>
              </div>
            </div>
            <button>Seguir</button>
          </div>

          <div className="user">
            <div className="profile-infos">
              <img src={Test} alt="Imagem de perfil" />
              <div className="username">
                <h4>João Lubaw</h4>
                <span>@jaozinlubaw</span>
              </div>
            </div>
            <button>Seguir</button>
          </div>

          <div className="user">
            <div className="profile-infos">
              <img src={Test} alt="Imagem de perfil" />
              <div className="username">
                <h4>João Lubaw</h4>
                <span>@jaozinlubaw</span>
              </div>
            </div>
            <button>Seguir</button>
          </div>

          <div className="user">
            <div className="profile-infos">
              <img src={Test} alt="Imagem de perfil" />
              <div className="username">
                <h4>João Lubaw</h4>
                <span>@jaozinlubaw</span>
              </div>
            </div>
            <button>Seguir</button>
          </div>
        </div>
      </div>
    </RightSidebarContainer>
  )
}

export default RightSidebar
