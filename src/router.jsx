import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'

import LoginView from './views/login'
import Layout from './views/layout'
import Welcome from './views/welcome'
import SignUpView from './views/signUp'

export const PartyRoutes = () => {


  return (
    <Routes>
      <Route path="/login" element={<LoginView />} />
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/sign-up" element={<SignUpView />} />


      <Route path="/" element={<Layout />} >
      </Route>



      <Route path="*" element={<Navigate to="/welcome" />} />

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