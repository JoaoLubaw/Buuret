import { RetContainer } from './style'

import DefaultProfile from '../../assets/images/DefaultProfile.jpg'

import Like from '../../assets/images/heart.svg'
import LikeIsLiked from '../../assets/images/filledHeart.svg'
import Comment from '../../assets/images/comment.svg'
import Share from '../../assets/images/share.svg'
import ReRet from '../../assets/images/retweet.svg'
import Buu from '../Buu'
import { Buser } from '../../types'
import { format } from 'date-fns'
import { useLikeRetMutation } from '../../services/api'
import { useState } from 'react'

type Props = {
  id: number | undefined
  isReret?: boolean
  RefBuu?: boolean
  Media?: boolean
  Detail?: boolean
  ResponseVisualization?: boolean
  content: string
  buser: Buser | undefined
  datetime: Date | string
  likes_count: number | undefined
  replies_count: number | undefined
  reret_count: number | undefined
  likes: number[] | null | undefined
}

const Ret = ({
  id,
  isReret,
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
  likes
}: Props) => {
  const formattedDatetime = datetime ? format(datetime, 'dd/MM/yyyy HH:mm') : ''
  const [likeRetMutation] = useLikeRetMutation()
  const [likesCount, setLikesCount] = useState(likes_count)
  const loggedBuser = JSON.parse(localStorage.getItem('buser') || '{}') as Buser
  const [liked, setLiked] = useState(likes?.includes(loggedBuser.id))

  const handleLike = () => {
    if (id !== undefined) {
      const idToString = id.toString()
      likeRetMutation(idToString)
      console.log(likes)

      if (liked) {
        setLikesCount(likesCount ? likesCount - 1 : 0)
      } else {
        setLikesCount(likesCount !== undefined ? likesCount + 1 : 1)
      }
      setLiked(!liked)
    }
  }

  return (
    <RetContainer className={Detail ? 'detail' : ''}>
      {buser?.profile ? (
        <img src={buser.profile} alt="Imagem de Perfil" className="avatar" />
      ) : (
        <img src={DefaultProfile} alt="Imagem de Perfil" className="avatar" />
      )}
      <div className="content">
        <div className="header">
          <h3 className="name">{buser?.name}</h3>
          <span className="username">@{buser?.username}</span>
          <span className="divisor">-</span>
          <span className="time">{formattedDatetime}</span>
          {isReret && <span className="reret">ReRetado por @joaolubaw</span>}
        </div>

        <div className="text">
          {RefBuu && (
            <div className="buuResponse">
              <Buu Response />
            </div>
          )}
          {content}
        </div>

        {Media && <img className="media" src={DefaultProfile} alt="Imagem" />}
        {!ResponseVisualization && (
          <div className="footer">
            <button
              onClick={handleLike} // Remove o argumento id
              className="footer-item like"
            >
              {liked ? (
                <img src={LikeIsLiked} alt="curtir" className="icon" />
              ) : (
                <img src={Like} alt="curtir" className="icon" />
              )}
              <span>{likesCount}</span>
            </button>
            <button className="footer-item comment">
              <img src={Comment} alt="comentar" className="icon" />
              <span>{replies_count}</span>
            </button>
            <button className="footer-item reret">
              <img src={ReRet} alt="fazer Reret" className="icon" />
              <span>{reret_count}</span>
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
