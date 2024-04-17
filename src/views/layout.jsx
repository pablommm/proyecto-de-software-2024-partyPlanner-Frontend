import { Outlet } from 'react-router-dom'
import { BottomNav } from 'src/components/boton-nav'

const Layout = () => {

  return (
    <>
      <Outlet />
      <BottomNav />
    </>
  )
}



export default Layout
