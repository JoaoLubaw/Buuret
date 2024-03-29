import MakeRet from '../../components/MakeRet'
import Layout from '../../components/Layout'
import { RetDetailContainer } from './styles'
import Ret from '../../components/Ret'

import Back from '../../assets/images/arrow.svg'
import { useGetaRetQuery } from '../../services/api'
import { useParams } from 'react-router-dom'
import { Ret as RetType } from '../../types'
import { useState, useEffect } from 'react'
import { customEventTarget } from '../../services/events'

const RetDetail = () => {
  const { id } = useParams<{ id?: string }>()
  const [retData, setRetData] = useState<RetType | null | undefined>(null)
  const { data, refetch } = useGetaRetQuery(id ?? '')
  const reversedReplies = data?.replies ? [...data.replies].reverse() : []

  useEffect(() => {
    const handleUpdate = () => {
      refetch()
    }

    customEventTarget.addEventListener('newRet', handleUpdate)

    return () => {
      customEventTarget.removeEventListener('newRet', handleUpdate)
    }
  }, [refetch])

  const goBack = () => {
    window.history.back()
  }

  console.log(data)

  useEffect(() => {
    if (data) {
      setRetData(data)
    }
  })

  return (
    <Layout page="timeline">
      <RetDetailContainer>
        <header>
          <button>
            <img onClick={goBack} src={Back} alt="Voltar" />
          </button>
          <h2>Ret</h2>
        </header>
        {retData ? (
          <>
            <Ret
              Detail
              datetime={retData.datetime ? retData.datetime : ''}
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
          </>
        ) : (
          <></>
        )}
        <MakeRet Detail ret={retData} />
        {reversedReplies &&
          reversedReplies.map((repRet) => (
            <Ret
              key={repRet.id}
              datetime={repRet.datetime ? repRet.datetime : ''}
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
