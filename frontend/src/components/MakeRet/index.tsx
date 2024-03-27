import DefaultProfile from '../../assets/images/DefaultProfile.jpg'
import Img from '../../assets/images/Img.svg'
import Exclude from '../../assets/images/x.svg'

import { MakeRetContainer } from './style'
import React, { ReactEventHandler, useState } from 'react'
import { useMakeRetMutation } from '../../services/api'
import { Buser, Buu, Ret } from '../../types'
import { toast } from 'react-toastify'

type Props = {
  Pop?: boolean
  Detail?: boolean
}

const MakeRet = ({ Pop, Detail }: Props) => {
  const loggedBuser = JSON.parse(localStorage.getItem('buser') || '{}') as Buser
  const [makeRet, { isLoading, isError, error }] = useMakeRetMutation()
  const [text, setText] = useState('')
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const textareaRef = React.createRef<HTMLTextAreaElement>()
  const [retToPost, setRetToPost] = useState<Ret>({
    likes: [],
    content: '',
    media: null,
    comret: false,
    replies: [],
    rerets: [],
    isreret: false,
    refbuu: null
  })

  const handleChange = (e: {
    target: { value: React.SetStateAction<string> }
  }) => {
    const textarea = textareaRef.current

    const newText = e.target.value.toString()
    setText(e.target.value)

    const updatedRet = { ...retToPost, content: newText }
    setRetToPost(updatedRet)

    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = textarea.scrollHeight + 'px'
    }
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files.length > 0) {
      setSelectedImage(files[0])
    }
  }

  const handleExclude = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault
    setSelectedImage(null)
  }

  const handleRetIT = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    const formData = new FormData()
    formData.append('content', retToPost.content)

    if (selectedImage) {
      formData.append('media', selectedImage)
    }

    makeRet(formData)
      .then((response) => {
        console.log(response)
        toast.success('Ret feito!')
        setText('')
        setSelectedImage(null)
      })
      .catch((error) => {
        console.error(error)
        toast.error('Erro ao enviar ret.')
      })
  }

  return (
    <MakeRetContainer>
      {loggedBuser.profile ? (
        <img
          className="avatar"
          src={loggedBuser.profile}
          alt="Imagem de Perfil"
        />
      ) : (
        <img className="avatar" src={DefaultProfile} alt="Imagem de Perfil" />
      )}

      <form encType="multipart/form-data">
        <textarea
          ref={textareaRef}
          className={Pop ? 'Pop' : ''}
          onChange={(e) => handleChange(e)}
          value={text}
          placeholder={
            Detail ? 'O que você quer responder?' : 'No que você está pensando?'
          }
        ></textarea>

        {selectedImage && (
          <div className="SelectedImageDIV">
            <div className="SelectedImage">
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Imagem selecionada"
              />
              <button onClick={handleExclude}>
                <img className="exclude" src={Exclude} alt="Excluir imagem" />
              </button>
            </div>
          </div>
        )}

        <div className="footer">
          <label htmlFor="imageUpload">
            <img src={Img} alt="Importar Imagens" />
          </label>
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />

          <button onClick={handleRetIT}>Ret-it</button>
        </div>
      </form>
    </MakeRetContainer>
  )
}

export default MakeRet
