import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout'
import { ProfileContainer } from './styles'
import Test from '../../assets/images/teste.jpg'
import Buu from '../../assets/images/ghost.svg'
import Ret from '../../components/Ret'
import { useParams } from 'react-router-dom'
import { useGetaBuserQuery, useUpdateUserMutation } from '../../services/api'
import { Buser } from '../../types'

const Profile = () => {
  const { username } = useParams()
  const [edit, setEdit] = useState(false)
  const loggedBuser = JSON.parse(localStorage.getItem('buser') || '{}') as Buser

  const { data: buser, isLoading, error } = useGetaBuserQuery(username || '')
  console.log('param:' + username + 'data:' + JSON.stringify(buser))

  const [text, setText] = useState('')
  const textareaRef = React.createRef<HTMLTextAreaElement>()

  useEffect(() => {
    setText(buser?.description || '')
  }, [buser])

  const [updateBuser] = useUpdateUserMutation()

  const handleSave = async () => {
    await updateBuser({ username, description: text })
    setEdit(false)
  }

  const handleCancel = () => {
    setText(buser?.description || '')
    setEdit(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
  }

  return (
    <Layout page="profile">
      {buser && (
        <ProfileContainer>
          <header>
            <h2>@{buser.username}</h2>
          </header>
          <div className="hero">
            <img src={Test} alt="Tela de fundo" className="background" />
            <div className="profile-info">
              <img src={Test} alt="Avatar" className="profile" />
              <div className="user-edit">
                <div className="username">
                  <h2>{buser.name}</h2>
                  <span>@{buser.username}</span>
                </div>

                {buser.username === loggedBuser.username && (
                  <>
                    {!edit ? (
                      <button onClick={() => setEdit(true)}>
                        Editar Perfil
                      </button>
                    ) : (
                      <div className="EditButtons">
                        <button onClick={handleSave}>Salvar</button>
                        <button onClick={handleCancel}>Cancelar</button>
                      </div>
                    )}
                  </>
                )}
              </div>
              <div className="description">
                {!edit ? (
                  <p>{buser.description}</p>
                ) : (
                  <textarea
                    ref={textareaRef}
                    onChange={handleChange}
                    value={text}
                  ></textarea>
                )}
              </div>
              <div className="count">
                <div className="followers">
                  <h4>
                    <span>{buser.followers_count}</span> seguidores
                  </h4>
                </div>
                <div className="following">
                  <h4>
                    <span>{buser.following_count}</span> seguindo
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
      )}
    </Layout>
  )
}

export default Profile
