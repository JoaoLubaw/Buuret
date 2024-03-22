import { RightSidebarContainer } from './styles'

import Lupa from '../../assets/images/lupa.svg'
import Test from '../../assets/images/teste.jpg'
import { useGetBusersQuery } from '../../services/api'
import { Buser } from '../../types'

const RightSidebar = () => {
  const { data, error, isLoading } = useGetBusersQuery('')

  console.log(data)

  return (
    <RightSidebarContainer>
      <div className="content">
        <div className="search">
          <img src={Lupa} alt="Lupa" />
          <input type="text" />
        </div>

        <div className="followMore">
          <h2>Siga também</h2>

          {data &&
            data.map((user: Buser) => (
              <div key={user.id} className="user">
                <div className="profile-infos">
                  {user.profile ? (
                    <img src={user.profile} alt="Imagem de perfil" />
                  ) : (
                    <img src={Test} alt="Imagem de perfil" />
                  )}
                  <div className="username">
                    <h4>{user.name}</h4>
                    <span>@{user.username}</span>
                  </div>
                </div>
                <button>Seguir</button>
              </div>
            ))}
        </div>
      </div>
    </RightSidebarContainer>
  )
}

export default RightSidebar
