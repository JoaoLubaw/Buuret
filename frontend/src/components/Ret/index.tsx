import { RetContainer } from './style'
import DefaultProfile from '../../assets/images/DefaultProfile.jpg'
import Like from '../../assets/images/heart.svg'
import LikeIsLiked from '../../assets/images/filledHeart.svg'
import Comment from '../../assets/images/comment.svg'
import Share from '../../assets/images/share.svg'
import ReRet from '../../assets/images/retweet.svg'
import Buu from '../Buu'
import { Buser, Buu as Buutypes, Ret as RetType } from '../../types'
import { format } from 'date-fns'
import {
  useGetaBuuQuery,
  useLikeRetMutation,
  useMakeReretMutation
} from '../../services/api'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { customEventTarget } from '../../services/events'

type Props = {
  id: number | undefined
  isReret?: boolean
  RefBuu?: number | undefined | null
  Media?: string
  Detail?: boolean
  ResponseVisualization?: boolean
  content: string
  buser: Buser | undefined
  datetime: Date | string
  likes_count: number | undefined
  replies_count: number | undefined
  reret_count: number | undefined
  likes: number[] | null | undefined
  openMediaZoom?: (mediaUrl: string) => void | undefined
  openPop?: (ret: RetType) => void | undefined
  ret: RetType
  update?: () => void
}

const Ret = ({
  id,
  Media,
  RefBuu,
  Detail,
  ResponseVisualization,
  content,
  buser,
  datetime,
  likes_count,
  replies_count,
  reret_count,
  likes,
  openMediaZoom,
  openPop,
  ret,
  update
}: Props) => {
  const formattedDatetime = datetime ? format(datetime, 'dd/MM/yyyy HH:mm') : ''
  const [likeRetMutation] = useLikeRetMutation()
  const [likesCount, setLikesCount] = useState(likes_count)
  const [commentCount, setCommentCount] = useState(replies_count)
  const [reretCount, setReretCount] = useState(reret_count)
  const loggedBuser = JSON.parse(localStorage.getItem('buser') || '{}') as Buser
  const [liked, setLiked] = useState(likes?.includes(loggedBuser.id))
  const { data, isSuccess } = useGetaBuuQuery(RefBuu)
  const [respondedBuu, setRespondedBuu] = useState<Buutypes>()
  const [formatedContent, setFormatedContent] = useState('')
  const [reretUsernames, setReretUsernames] = useState<string[]>([])
  const [isReret, setIsReret] = useState(false)

  const navigate = useNavigate()
  const imageUrl = buser?.profile
  const baseUrl = 'https://joaolubaw.pythonanywhere.com'

  const [makeReret, { isLoading: makeReretLoading }] = useMakeReretMutation()

  useEffect(() => {
    if (Array.isArray(ret.reret_by) && loggedBuser && loggedBuser.following) {
      // Filtrar os usernames dos usuários que o usuário logado segue
      const followedUsernames = ret.reret_by.filter((username) =>
        loggedBuser.following.includes(username)
      )

      // Pegar os três primeiros usernames filtrados
      const topThreeUsernames = followedUsernames.slice(0, 3)
      setReretUsernames(topThreeUsernames)
      setIsReret(true)
    }
  }, [ret.reret_by, loggedBuser?.following]) // Aqui usamos o operador ?. para verificar a propriedade following

  const handleReret = async () => {
    try {
      if (id && Array.isArray(ret.rerets) && !makeReretLoading && update) {
        if (ret.rerets.includes(loggedBuser.id)) {
          await makeReret(id.toString()).unwrap()
        } else {
          await makeReret(id.toString()).unwrap()
          console.log('oi')
        }
        update()
      }
    } catch (error) {
      console.error('Erro ao fazer/desfazer reret:', error)
    }
  }

  const prefixedImageUrl = imageUrl?.startsWith('/')
    ? baseUrl + imageUrl
    : imageUrl

  useEffect(() => {
    if (content) {
      const formattedContent = content.replace(/\r\n/g, '<br>')
      setFormatedContent(formattedContent)
    }
  }, [content])

  useEffect(() => {
    try {
      if (isSuccess && data) {
        setRespondedBuu(data)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }, [isSuccess, data])

  const handleMediaClick = () => {
    if (Media && openMediaZoom) {
      openMediaZoom(Media)
    }
  }

  const handleLike = () => {
    if (id !== undefined) {
      const idToString = id.toString()
      likeRetMutation(idToString)

      if (liked) {
        setLikesCount(likesCount ? likesCount - 1 : 0)
      } else {
        setLikesCount(likesCount !== undefined ? likesCount + 1 : 1)
      }
      setLiked(!liked)
    }
  }

  const handleCommentClick = () => {
    if (openPop) {
      openPop(ret)
      customEventTarget.dispatchEvent(customEventTarget.popRetEvent)
    }
  }

  // Links

  const ProfileLink = (username: string | undefined) => {
    navigate(`/${username}`)
    window.scrollTo(0, 0)
  }

  const RetLink = (id: string | undefined) => {
    navigate(`/ret/${id}`)
    window.scrollTo(0, 0)
  }

  // Fim Links

  return (
    <RetContainer className={Detail ? 'detail' : ''}>
      {buser?.profile ? (
        <img
          onClick={() => ProfileLink(buser?.username)}
          src={prefixedImageUrl}
          alt="Imagem de Perfil"
          className="avatar"
        />
      ) : (
        <img
          src={DefaultProfile}
          onClick={() => ProfileLink(buser?.username)}
          alt="Imagem de Perfil"
          className="avatar"
        />
      )}
      <div className="content">
        <div className="header">
          <h3 onClick={() => ProfileLink(buser?.username)} className="name">
            {buser?.name}
          </h3>
          <span className="username">@{buser?.username}</span>
          <span className="divisor">-</span>
          <span className="time">{formattedDatetime}</span>
          {isReret && (
            <span className="reret">
              ReRetado por
              {reretUsernames.map((username, index) => (
                <span key={index}>@{username}</span>
              ))}
            </span>
          )}
        </div>

        <div className="text" onClick={() => RetLink(id?.toString())}>
          {respondedBuu && typeof RefBuu === 'number' && (
            <div className="buuResponse">
              <Buu Response content={respondedBuu.content} openned={true} />
            </div>
          )}
          <div
            className="contentText"
            dangerouslySetInnerHTML={{ __html: formatedContent }}
          ></div>
        </div>

        {Media && (
          <img
            onClick={handleMediaClick}
            className="media"
            src={Media}
            alt="Imagem"
          />
        )}

        {!ResponseVisualization && (
          <div className="footer">
            <button onClick={handleLike} className="footer-item like">
              {liked ? (
                <img src={LikeIsLiked} alt="curtir" className="icon" />
              ) : (
                <img src={Like} alt="curtir" className="icon" />
              )}
              <span>{likesCount}</span>
            </button>
            <button
              className="footer-item comment"
              onClick={handleCommentClick}
            >
              <img src={Comment} alt="comentar" className="icon" />
              <span>{commentCount}</span>
            </button>
            <button className="footer-item reret">
              <img
                onClick={handleReret}
                src={ReRet}
                alt="fazer Reret"
                className="icon"
              />
              <span>{reretCount}</span>
            </button>
            <button className="footer-item share">
              <img src={Share} alt="compartilhar" className="icon" />
            </button>
          </div>
        )}
      </div>
    </RetContainer>
  )
}

export default Ret
