import { Outlet } from 'react-router-dom'
import BotomNav from 'src/components/bottom-nav'
import { HeaderNav } from 'src/components/header-nav'

const Layout = () => {

  return (
    <>
      <HeaderNav />
      <Outlet />
      <BotomNav />

    </>
  )
}



export default Layout
