import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Buser, Ret as RetType } from '../../types'

import { customEventTarget } from '../../services/events'
import {
  useFollowMutation,
  useGetaBuserQuery,
  useGetaBuserRetsQuery,
  useSendBuuMutation,
  useUnfollowMutation,
  useUpdateUserMutation
} from '../../services/api'

import MediaZoom from '../../components/MediaZoom'
import Layout from '../../components/Layout'
import Ret from '../../components/Ret'
import { ProfileContainer } from './styles'

import editIMG from '../../assets/images/Edit.svg'
import DefaultProfile from '../../assets/images/DefaultProfile.jpg'
import DefaultBackground from '../../assets/images/DefaultBackgound.jpg'
import Back from '../../assets/images/arrow.svg'
import Buu from '../../assets/images/ghost.svg'

import { SyncLoader } from 'react-spinners'
import { LoaderContainer, colors } from '../../styles'
import Error from '../Error'

const Profile = () => {
  const { username } = useParams()
  const [updateBuser] = useUpdateUserMutation()
  const [sendBuu] = useSendBuuMutation()
  const [edit, setEdit] = useState(false)
  const loggedBuser = JSON.parse(localStorage.getItem('buser') || '{}') as Buser

  const [follow] = useFollowMutation()
  const [unfollow] = useUnfollowMutation()
  const {
    data: buser,
    isLoading: buserIsLoading,
    error
  } = useGetaBuserQuery(username || '')
  const {
    data: buserRets,
    isLoading: buserRetsIsLoading,
    refetch
  } = useGetaBuserRetsQuery(username || '')
  const reversedData = buserRets ? [...buserRets].reverse() : []

  const [buuText, setBuuText] = useState('')
  const [text, setText] = useState('')
  const [name, setName] = useState('')
  const [profileImage, setProfileImage] = useState<File | null>(null)
  const [backgroundImage, setBackgroundImage] = useState<File | null>(null)

  const [selectedMedia, setSelectedMedia] = useState<string | null>(null)
  const [openMedia, setOpenMedia] = useState(false)

  //Resize

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 425)

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 425)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  //Resize

  //Pop
  const [showPopMakeRet, setShowPopMakeRet] = useState(false)
  const [selectedRet, setSelectedRet] = useState<RetType | null>(null)

  function bloquearScroll() {
    document.body.style.overflow = 'hidden'
  }

  function desbloquearScroll() {
    document.body.style.overflow = ''
  }

  const openPopMakeRet = (selRec: RetType) => {
    setShowPopMakeRet(true)
    setSelectedRet(selRec)
    bloquearScroll()
  }

  const closePopMakeRet = () => {
    setShowPopMakeRet(false)
    desbloquearScroll()
  }

  //Pop

  //OpenMedia
  const openMediaZoom = (mediaUrl: string) => {
    setSelectedMedia(mediaUrl)
    setOpenMedia(true)
  }

  const closeMediaZoom = () => {
    setSelectedMedia(null)
    setOpenMedia(false)
  }
  // /OpenMedia

  useEffect(() => {
    const handleUpdate = () => {
      refetch()
    }

    customEventTarget.addEventListener('newRet', handleUpdate)

    return () => {
      customEventTarget.removeEventListener('newRet', handleUpdate)
    }
  }, [refetch])

  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleBuuTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBuuText(e.target.value)
  }

  const handleProfileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setProfileImage(event.target.files[0])
    } else {
      console.log('Nenhum arquivo selecionado.')
    }
  }

  const handleBackgroundChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
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
    event.preventDefault()

    try {
      await sendBuu({
        sender: loggedBuser.id,
        receiver: buser?.id,
        content: buuText,
        opened: false
      })
      setBuuText('')
      toast.success('Buu enviado!')
      window.location.reload()
    } catch (error) {
      console.error('Erro ao enviar o Buu:', error)
    }
  }

  const handleFollow = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    try {
      await follow(buser?.username)
      window.location.reload()
      // Chama a mutação para seguir o usuário
    } catch (error) {
      console.error('Erro ao seguir o usuário:', error)
    }
  }

  const handleUnfollow = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    try {
      await unfollow(buser?.username)
      window.location.reload()
      // Chama a mutação para parar de seguir o usuário
    } catch (error) {
      console.error('Erro ao parar de seguir o usuário:', error)
    }
  }

  const goBack = () => {
    window.history.back()
  }

  return (
    <Layout page="profile">
      {buserIsLoading && (
        <LoaderContainer>
          <SyncLoader className="loader" color={colors.blue} />
        </LoaderContainer>
      )}
      {error && (
        <ProfileContainer>
          <header>
            <div className="division">
              <button>
                <img onClick={goBack} src={Back} alt="Voltar" />
              </button>
              <h2>@{username}</h2>
            </div>
            {isSmallScreen ? (
              <img
                src={
                  loggedBuser?.profile ? loggedBuser.profile : DefaultProfile
                }
                alt="Imagem de perfil"
                className="avatar"
              />
            ) : (
              <></>
            )}
          </header>
          <Error />
        </ProfileContainer>
      )}
      {buser && (
        <ProfileContainer>
          <header>
            <div className="division">
              <button>
                <img onClick={goBack} src={Back} alt="Voltar" />
              </button>
              <h2>@{buser.username}</h2>
            </div>
            {isSmallScreen ? (
              <img
                src={
                  loggedBuser?.profile ? loggedBuser.profile : DefaultProfile
                }
                alt="Imagem de perfil"
                className="avatar"
              />
            ) : (
              <></>
            )}
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
                  <img
                    src={DefaultBackground}
                    alt="background"
                    className="background"
                  />
                )}
                <label htmlFor="imageUpload">
                  <img
                    src={editIMG}
                    alt="Importar Imagens"
                    className="labelIMG labelIMG--back"
                  />
                </label>
                <input
                  type="file"
                  id="imageUpload"
                  onChange={handleBackgroundChange}
                  accept="image/*"
                  style={{ display: 'none' }}
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
                  <img
                    src={DefaultBackground}
                    alt="Tela de fundo"
                    className="background"
                  />
                )}
              </>
            )}

            <div className="profile-info">
              {edit ? (
                <>
                  {buser.profile ? (
                    <img
                      src={buser.profile}
                      alt="Avatar"
                      className="profile"
                      onClick={() =>
                        buser.profile && openMediaZoom(buser.profile)
                      }
                    />
                  ) : (
                    <img
                      src={DefaultProfile}
                      alt="Avatar"
                      className="profile"
                      onClick={() => openMediaZoom(DefaultProfile)}
                    />
                  )}
                  <label htmlFor="imageUpload" className="labelIMG">
                    <img src={editIMG} alt="Importar Imagens" />
                  </label>
                  <input
                    type="file"
                    id="imageUpload"
                    onChange={handleProfileChange}
                    accept="image/*"
                    style={{ display: 'none' }}
                  />
                </>
              ) : (
                <>
                  {buser.profile ? (
                    <img
                      src={buser.profile}
                      alt="Avatar"
                      className="profile"
                      onClick={() =>
                        buser.profile && openMediaZoom(buser.profile)
                      }
                    />
                  ) : (
                    <img
                      src={DefaultProfile}
                      alt="Avatar"
                      className="profile"
                      onClick={() =>
                        buser.profile && openMediaZoom(DefaultProfile)
                      }
                    />
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
                      <button
                        className="EditButton"
                        onClick={() => setEdit(true)}
                      >
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
                    className="edditing"
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
                buser &&
                loggedBuser.username !== buser.username &&
                buser.followers &&
                buser.followers.some(
                  (follower) => follower === loggedBuser.id
                ) ? (
                  <button onClick={handleUnfollow}>Parar de Seguir</button>
                ) : (
                  loggedBuser &&
                  buser &&
                  loggedBuser.username !== buser.username && (
                    <button onClick={handleFollow}>Seguir</button>
                  )
                )}
              </div>
            </div>

            <form className="buuSender">
              <textarea
                value={buuText}
                onChange={handleBuuTextChange}
              ></textarea>
              <button onClick={(event) => handleSendBuu(buuText, event)}>
                <span>Enviar Buu</span> <img src={Buu} alt="Fantasma" />
              </button>
            </form>

            <div className="footer">
              <h3>Rets</h3>
            </div>
          </div>
          {buserRetsIsLoading ? (
            <LoaderContainer>
              <SyncLoader className="loader" color={colors.blue} />
            </LoaderContainer>
          ) : (
            <> </>
          )}

          {reversedData &&
            reversedData &&
            reversedData.map((ret) => (
              <Ret
                openMediaZoom={openMediaZoom}
                id={ret.id}
                datetime={ret.datetime ? ret.datetime : ''}
                buser={ret.user}
                content={ret.content}
                key={ret.id}
                likes_count={ret.likes_count}
                replies_count={ret.replies_count}
                reret_count={ret.reret_count}
                likes={ret.likes}
                Media={ret.media}
                openPop={() => openPopMakeRet(ret)}
                ret={ret}
              />
            ))}
          {selectedMedia && showPopMakeRet && (
            <MediaZoom
              mediaURL={selectedMedia}
              Open={openMedia}
              close={closeMediaZoom}
            />
          )}
        </ProfileContainer>
      )}
    </Layout>
  )
}

export default Profile
