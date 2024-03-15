import React, { useState } from 'react'

import Layout from '../../components/Layout'
import { ProfileContainer } from './styles'

import Test from '../../assets/images/teste.jpg'
import Buu from '../../assets/images/ghost.svg'
import Ret from '../../components/Ret'
import { useParams } from 'react-router-dom'
import { useGetaBuserQuery } from '../../services/api'

const Profile = () => {
  const [text, setText] = useState('')
  const { data: buser, isLoading, isError } = useGetaBuserQuery(id)
  const textareaRef = React.createRef<HTMLTextAreaElement>()

  const handleChange = () => {
    const { username } = useParams()

    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = textarea.scrollHeight + 'px'
    }
  }
  return (
    <Layout page="profile">
      <ProfileContainer>
        <header>
          <h2>@jaozinlubaw</h2>
        </header>
        <div className="hero">
          <img src={Test} alt="Tela de fundo" className="background" />
          <div className="profile-info">
            <img src={Test} alt="Avatar" className="profile" />
            <div className="user-edit">
              <div className="username">
                <h2>jaozin lubaw</h2>
                <span>@jaozinlubaw</span>
              </div>
              <button>Editar Perfil</button>
            </div>
            <div className="description">
              <textarea
                ref={textareaRef}
                value="Sou só mais uma variante | INPFT-T | 19y importante é viver né"
              ></textarea>
            </div>
            <div className="count">
              <div className="followers">
                <h4>
                  <span>1000</span> seguidores
                </h4>
              </div>
              <div className="following">
                <h4>
                  <span>1000</span> seguindo
                </h4>
              </div>
              <button>Seguir</button>
            </div>
          </div>

          <form action="" className="buuSender">
            <textarea></textarea>
            <button>
              Enviar Buu <img src={Buu} alt="Fantasma" />
            </button>
          </form>

          <div className="footer">
            <h3>Rets</h3>
          </div>
        </div>
        <Ret />
        <Ret />
        <Ret />
      </ProfileContainer>
    </Layout>
  )
}

export default Profile
