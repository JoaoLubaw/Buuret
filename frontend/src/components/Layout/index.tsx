import { ReactNode, useEffect, useState } from 'react'

import LeftSidebar from '../../components/LeftSidebar'
import PopMakeRet from '../../components/PopMakeRet'
import RightSidebar from '../../components/RightSidebar'

import { MainContainer } from '../../styles'
import Footer from '../Footer'

type Props = {
  children: ReactNode
  page: 'timeline' | 'buus' | 'profile' | 'search'
}

const Layout: React.FC<Props> = ({ children, page }: Props) => {
  const [showPopMakeRet, setShowPopMakeRet] = useState(false)

  //Resize
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 425)

  useEffect(() => {
    const handleResize = () => {
      const smallScreen = window.innerWidth <= 425
      setIsSmallScreen(smallScreen)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  //Resize

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
      {isSmallScreen && <Footer page={page} />}
    </>
  )
}

export default Layout
