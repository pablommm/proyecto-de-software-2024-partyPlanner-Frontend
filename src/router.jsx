import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'

import LoginView from './views/login'
import Layout from './views/layout'
import SignUpView from './views/signUp'
import PrincipalView from './views/principalView'
import Eventos from './views/eventosView'
import NuevoEvento from './views/nuevoEvento'
import EventDetails from './views/eventDetails'

export const PartyRoutes = () => {


  return (
    <Routes>
      <Route path="/login" element={<LoginView />} />
      <Route path="/sign-up" element={<SignUpView />} />
      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="/" element={<Layout />} >
        <Route path="/instalaciones" element={<PrincipalView />} />
        <Route path="/eventos" element={<Eventos />} />
        <Route path="/nuevo" element={<NuevoEvento />} />
        <Route path="/eventDetails" element={<EventDetails />} />

      </Route>


      <Route path="*" element={<Navigate to="/login" />} />
      

    </Routes>
  )
}

export const PartyRouter = () => {
  return (
    <Router>
      <PartyRoutes />
    </Router>
  )
}