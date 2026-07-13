import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { Layout } from './pages/Layout'
import { EventPage } from './pages/EventPage'
import { PersonalDashboard } from './pages/PersonalDashboard'
import { AboutUsPage } from './pages/AboutUsPage'
import { GalleryPage } from './pages/GalleryPage'
import { ContactPage } from './pages/ContactPage'
import { RegisterPage } from './pages/RegisterPage'
import { LoginPage } from './pages/LoginPage'
import { ProtectedRoute } from './components/ProtectedRoute'
import { YogCornerPage } from './pages/Yog'
import { Toaster } from 'react-hot-toast'
import { MembershipFormPage } from './pages/MembershipFormPage'

function App() {

  return (
    <>
      <Toaster position='bottom-right' />
      <BrowserRouter>
        <Routes>
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/' element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path='about' element={<AboutUsPage />} />
            <Route path='events' element={<EventPage />} />
            <Route path='gallery' element={<GalleryPage />} />
            <Route path='contact' element={<ContactPage />} />
            <Route path='yog' element={<YogCornerPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path='me' element={<PersonalDashboard />} />
              <Route path='membership' element={<MembershipFormPage />} />
            </Route>
            <Route path='*' element={<h1 className='text-center h-[60dvh] text-5xl my-5 underline'>404 - Page Not Found</h1>} />
          </Route>
          <Route path='/test' element={<>
          </>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
