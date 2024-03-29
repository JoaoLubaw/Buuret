import MakeRet from '../../components/MakeRet'
import Layout from '../../components/Layout'
import { RetDetailContainer } from './styles'
import Ret from '../../components/Ret'
import Back from '../../assets/images/arrow.svg'
import { useGetaRetQuery } from '../../services/api'
import { useParams } from 'react-router-dom'
import { Ret as RetType } from '../../types'
import { useState, useEffect } from 'react'

const RetDetail = () => {
  const { id } = useParams<{ id?: string }>()
  const [retData, setRetData] = useState<RetType | null>(null)
  const [replies, setReplies] = useState<RetType[]>([])

  useEffect(() => {
    const fetchRetAndReplies = async () => {
      try {
        const { data: retData } = await useGetaRetQuery(id ?? '')
        setRetData(retData ?? null)

        if (retData?.replies) {
          const promises = retData.replies.map(async (repId) => {
            const { data: repData } = await useGetaRetQuery(repId.toString())
            return repData
          })

          const repliesData = await Promise.all(promises)
          setReplies(repliesData.filter(Boolean) as RetType[])
        }
      } catch (error) {
        console.error('Error fetching ret and replies:', error)
      }
    }

    fetchRetAndReplies()
  }, [id])

  const goBack = () => {
    window.history.back()
  }

  return (
    <Layout page="timeline">
      <RetDetailContainer>
        <header>
          <button>
            <img onClick={goBack} src={Back} alt="Voltar" />
          </button>
          <h2>Ret</h2>
        </header>
        {retData && (
          <Ret
            Detail
            datetime={retData.datetime ?? ''}
            buser={retData.user}
            content={retData.content}
            reret_count={retData.reret_count}
            likes_count={retData.likes_count}
            replies_count={retData.replies_count}
            id={retData.id}
            likes={retData.likes}
            Media={retData.media}
            RefBuu={retData.refbuu}
            ret={retData}
          />
        )}
        <MakeRet Detail />
        {replies.map((repRet) => (
          <Ret
            key={repRet.id}
            datetime={repRet.datetime ?? ''}
            buser={repRet.user}
            content={repRet.content}
            reret_count={repRet.reret_count}
            likes_count={repRet.likes_count}
            replies_count={repRet.replies_count}
            id={repRet.id}
            likes={repRet.likes}
            Media={repRet.media}
            RefBuu={repRet.refbuu}
            ret={repRet}
          />
        ))}
      </RetDetailContainer>
    </Layout>
  )
}

export default RetDetail
