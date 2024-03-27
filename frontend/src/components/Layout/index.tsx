import { ReactNode, useState } from 'react'
import LeftSidebar from '../../components/LeftSidebar'
import MediaZoom from '../../components/MediaZoom'
import PopMakeRet from '../../components/PopMakeRet'
import RightSidebar from '../../components/RightSidebar'
import { MainContainer } from '../../styles'

type Props = {
  children: ReactNode
  page: 'timeline' | 'buus' | 'profile'
}

const Layout: React.FC<Props> = ({ children, page }: Props) => {
  const [showPopMakeRet, setShowPopMakeRet] = useState(false)

  function bloquearScroll() {
    document.body.style.overflow = 'hidden'
  }

  function desbloquearScroll() {
    document.body.style.overflow = ''
  }

  const openPopMakeRet = () => {
    setShowPopMakeRet(true)
    bloquearScroll()
  }

  const closePopMakeRet = () => {
    setShowPopMakeRet(false)
    desbloquearScroll()
  }

  return (
    <>
      <LeftSidebar page={page} openPopMakeRet={openPopMakeRet} />
      <MainContainer>{children}</MainContainer>
      <RightSidebar />
      {showPopMakeRet && <PopMakeRet closePopMakeRet={closePopMakeRet} />}
    </>
  )
}

export default Layout
