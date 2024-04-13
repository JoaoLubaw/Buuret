import { useState } from 'react'
import Lupa from '../../assets/images/lupa.svg'
import DefaultProfile from '../../assets/images/DefaultProfile.jpg'

import { useSearchBuserQuery } from '../../services/api'
import { SearchContainer } from './styles'
import { Buser } from '../../types'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '../../contexts/authContext'

const SearchField = () => {
  const [search, setSearch] = useState('')
  const { data } = useSearchBuserQuery(search)
  const navigate = useNavigate()

  const goProfile = (username: string) => {
    navigate(`/${username}`)
    window.scrollTo(0, 0)
  }

  const maxResults = 5 // Defina o número máximo de resultados exibidos

  return (
    <SearchContainer>
      <div className="search">
        <img src={Lupa} alt="Lupa" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {search && (
        <div className="results">
          {data &&
            data.slice(0, maxResults).map((user: Buser) => (
              <div key={user.id} className="user">
                <div
                  className="profile-infos"
                  onClick={() => goProfile(user.username)}
                >
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
              </div>
            ))}
        </div>
      )}
    </SearchContainer>
  )
}

export default SearchField
