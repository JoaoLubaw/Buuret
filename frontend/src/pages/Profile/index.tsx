import React, { useState, useEffect, useRef } from 'react'
import Layout from '../../components/Layout'
import { ProfileContainer } from './styles'
import Test from '../../assets/images/teste.jpg'
import Buu from '../../assets/images/ghost.svg'
import Ret from '../../components/Ret'
import { useParams } from 'react-router-dom'
import {
  useFollowMutation,
  useGetaBuserQuery,
  useSendBuuMutation,
  useUnfollowMutation,
  useUpdateUserMutation
} from '../../services/api'
import { Buser } from '../../types'
import Cookies from 'js-cookie'

const Profile = () => {
  const { username } = useParams()
  const [updateBuser] = useUpdateUserMutation()
  const [sendBuu] = useSendBuuMutation()
  const [edit, setEdit] = useState(false)

  const loggedBuser = JSON.parse(localStorage.getItem('buser') || '{}') as Buser

  const [follow] = useFollowMutation()
  const [unfollow] = useUnfollowMutation()

  const { data: buser, isLoading, error } = useGetaBuserQuery(username || '')
  console.log('param:' + username + 'data:' + JSON.stringify(buser))

  const [buuText, setBuuText] = useState('')

  const [text, setText] = useState('')
  const [name, setName] = useState('')
  const [profileImage, setProfileImage] = useState<File | null>(null)
  const [backgroundImage, setBackgroundImage] = useState<File | null>(null)

  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleBuuTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBuuText(e.target.value)
  }

  const handleProfileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      console.log('Arquivo selecionado:', event.target.files[0])
      setProfileImage(event.target.files[0])
    } else {
      console.log('Nenhum arquivo selecionado.')
    }
  }

  const handleBackgroundChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      console.log('Arquivo selecionado:', event.target.files[0])
      setBackgroundImage(event.target.files[0])
    } else {
      console.log('Nenhum arquivo selecionado.')
    }
  }

  useEffect(() => {
    setText(buser?.description || '')
    setName(buser?.name || '')

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto' // Resetar a altura para calcular corretamente
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px` // Definir a altura conforme o conteúdo
    }
  }, [buser])

  const handleSave = async () => {
    try {
      const formData = new FormData()
      formData.append('description', text)
      formData.append('name', name)

      if (buser) {
        formData.append('username', buser?.username)
        formData.append('birthdate', buser?.birthdate)
        formData.append('password', buser?.password)
        formData.append('is_active', 'true')
      }
      if (profileImage) {
        formData.append('profile', profileImage)
      }
      if (backgroundImage) {
        formData.append('background', backgroundImage)
      }

      await updateBuser({ username: buser?.username, newData: formData })
      window.location.reload()
      setEdit(false)
    } catch (error) {
      console.error('Erro ao editar o Buser:', error)
    }
  }

  const handleCancel = () => {
    setText(buser?.description || '')
    setEdit(false)
  }

  const handleChangeDesc = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
    if (textareaRef.current) {
      textareaRef.current.rows = Math.min(
        Math.ceil((textareaRef.current.scrollHeight - 20) / 16),
        6
      )
    }
  }

  const handleChangeName = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setName(e.target.value)
  }

  const handleSendBuu = async (
    buuText: string,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault() // Evita o comportamento padrão de recarregar a página

    try {
      await sendBuu({
        sender: loggedBuser.id,
        receiver: buser?.id,
        content: buuText,
        opened: false
      })
    } catch (error) {
      console.error('Erro ao enviar o Buu:', error)
    }
  }

  const handleFollow = async () => {
    try {
      const csrftoken = Cookies.get('csrftoken') // Obtém o token CSRF do cookie
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken // Define o token CSRF no cabeçalho
        }
      }
      await follow({ username: buser?.username }, config) // Chama a mutação para seguir o usuário
    } catch (error) {
      console.error('Erro ao seguir o usuário:', error)
    }
  }

  const handleUnfollow = async () => {
    try {
      await unfollow({
        username: buser?.username
      }) // Chama a mutação para parar de seguir o usuário
    } catch (error) {
      console.error('Erro ao parar de seguir o usuário:', error)
    }
  }

  return (
    <Layout page="profile">
      {buser && (
        <ProfileContainer>
          <header>
            <h2>@{buser.username}</h2>
          </header>
          <div className="hero">
            {edit ? (
              <>
                {buser.background ? (
                  <img
                    src={buser.background}
                    alt="background"
                    className="background"
                  />
                ) : (
                  <img src={Test} alt="background" className="background" />
                )}
                <input
                  type="file"
                  placeholder="Escolher"
                  className="change-background-button"
                  onChange={handleBackgroundChange}
                />
              </>
            ) : (
              <>
                {buser.background ? (
                  <img
                    src={buser.background}
                    alt="Background"
                    className="background"
                  />
                ) : (
                  <img src={Test} alt="Tela de fundo" className="background" />
                )}
              </>
            )}

            <div className="profile-info">
              {edit ? (
                <>
                  {buser.profile ? (
                    <img src={buser.profile} alt="Avatar" className="profile" />
                  ) : (
                    <img src={Test} alt="Avatar" className="profile" />
                  )}
                  <input
                    type="file"
                    placeholder="Escolher foto de perfil"
                    onChange={handleProfileChange}
                  />
                </>
              ) : (
                <>
                  {buser.profile ? (
                    <img src={buser.profile} alt="Avatar" className="profile" />
                  ) : (
                    <img src={Test} alt="Avatar" className="profile" />
                  )}
                </>
              )}

              <div className="user-edit">
                <div className="username">
                  {edit ? (
                    <textarea
                      className="EditNAME"
                      value={name}
                      maxLength={30}
                      onChange={handleChangeName}
                    ></textarea>
                  ) : (
                    <>
                      <h2>{buser.name}</h2>
                    </>
                  )}

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
                  <textarea
                    value={buser.description}
                    ref={textareaRef}
                    readOnly={true}
                  ></textarea>
                ) : (
                  <textarea
                    ref={textareaRef}
                    onChange={handleChangeDesc}
                    value={text}
                    maxLength={100}
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

                {loggedBuser &&
                loggedBuser.following &&
                loggedBuser.following.includes(buser) ? (
                  <button onClick={handleUnfollow}>Parar de Seguir</button>
                ) : (
                  <button onClick={handleFollow}>Seguir</button>
                )}
              </div>
            </div>

            <form className="buuSender">
              <textarea
                value={buuText}
                onChange={handleBuuTextChange}
              ></textarea>
              <button onClick={(event) => handleSendBuu(buuText, event)}>
                Enviar Buu <img src={Buu} alt="Fantasma" />
              </button>
            </form>

            <div className="footer">
              <h3>Rets</h3>
            </div>
          </div>
          {buser && buser.rets && buser.rets.map((ret) => <Ret key={ret.id} />)}
        </ProfileContainer>
      )}
    </Layout>
  )
}

export default Profile
