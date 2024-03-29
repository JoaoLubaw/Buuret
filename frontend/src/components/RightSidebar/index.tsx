import { RightSidebarContainer } from './styles'

import Lupa from '../../assets/images/lupa.svg'
import DefaultProfile from '../../assets/images/DefaultProfile.jpg'
import {
  useFollowMutation,
  useGetBusersQuery,
  useUnfollowMutation
} from '../../services/api'
import { Buser } from '../../types'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { customEventTarget } from '../../services/events'

const RightSidebar = () => {
  const { data, error, isLoading } = useGetBusersQuery('')
  const [follow] = useFollowMutation()
  const [unfollow] = useUnfollowMutation()
  const [followingUsers, setFollowingUsers] = useState<string[]>([]) // Lista de usernames que o usuário está seguindo
  const [hide, setHide] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const handleHide = () => {
      setHide(!hide)
    }
    customEventTarget.addEventListener('popRet', handleHide)

    return () => {
      customEventTarget.removeEventListener('popRet', handleHide)
    }
  }, [hide])

  const handleFollow = async (username: string) => {
    try {
      await follow(username)
      setFollowingUsers([...followingUsers, username]) // Adiciona o username ao array de usuários seguidos
    } catch (error) {
      console.error('Erro ao seguir o usuário:', error)
    }
  }

  const handleUnfollow = async (username: string) => {
    try {
      await unfollow(username)
      setFollowingUsers(followingUsers.filter((user) => user !== username)) // Remove o username do array de usuários seguidos
    } catch (error) {
      console.error('Erro ao deixar de seguir o usuário:', error)
    }
  }

  const isFollowing = (username: string) => followingUsers.includes(username)

  const goProfile = (username: string) => {
    navigate(`/${username}`)
    window.scrollTo(0, 0)
  }

  return (
    <RightSidebarContainer className={hide ? 'hide-right-sidebar' : ''}>
      <div className="content">
        <div className="search">
          <img src={Lupa} alt="Lupa" />
          <input type="text" />
        </div>

        <div className="followMore">
          <h2>Siga também</h2>

          {data &&
            data.map((user: Buser) => (
              <div
                onClick={() => goProfile(user.username)}
                key={user.id}
                className="user"
              >
                <div className="profile-infos">
                  {user.profile ? (
                    <img src={user.profile} alt="Imagem de perfil" />
                  ) : (
                    <img src={DefaultProfile} alt="Imagem de perfil" />
                  )}
                  <div className="username">
                    <h4>{user.name}</h4>
                    <span>@{user.username}</span>
                  </div>
                </div>
                {isFollowing(user.username) ? (
                  <button onClick={() => handleUnfollow(user.username)}>
                    Deixar de seguir
                  </button>
                ) : (
                  <button onClick={() => handleFollow(user.username)}>
                    Seguir
                  </button>
                )}
              </div>
            ))}
        </div>
      </div>
    </RightSidebarContainer>
  )
}

export default RightSidebar
