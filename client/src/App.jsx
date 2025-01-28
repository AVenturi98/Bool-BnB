
import { BrowserRouter, Routes, Route } from 'react-router'
import DefaultLayout from './layouts/DefaultLayout'
import BlankLayout from './layouts/BlankLayout'
import Login from './pages/Login'
import MailForm from './components/MailForm'
import PropertiesForm from './components/PropertiesForm'
import Show from './pages/Show'
import { AuthProvider } from './contexts/AuthContext'


import NotFound from './pages/NotFound'
import PropertiesList from './components/PropertiesList'


function App() {

  const setAuthenticated = () => { }

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path='/' element={<PropertiesList />} />
            <Route path='/properties/:id' element={<Show />} />
            <Route path='/mail' element={<MailForm />} />
            <Route path='/properties' element={<PropertiesForm />} />
            <Route path='/login' element={<Login setAuthenticated={setAuthenticated} />} />
          </Route>
          <Route element={<BlankLayout />}>
            <Route path='*' element={<NotFound />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
