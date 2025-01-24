
import { BrowserRouter, Routes, Route } from 'react-router'
import DefaultLayout from './layouts/DefaultLayout'
import NotFound from './layouts/NotFound'
import Login from './pages/Login'
import MailForm from './components/MailForm'
import PropertiesForm from './components/PropertiesForm'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<DefaultLayout />} />
        <Route path='/mail' element={<MailForm />} />
        <Route path='/properties' element={<PropertiesForm />} />
        <Route path='/login' element={<Login />} />
        <Route path='*'>
          <Route element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
