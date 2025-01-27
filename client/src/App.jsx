
import { BrowserRouter, Routes, Route } from 'react-router'
import DefaultLayout from './layouts/DefaultLayout'
import BlankLayout from './layouts/BlankLayout'
import Login from './pages/Login'
import MailForm from './components/MailForm'
import PropertiesForm from './components/PropertiesForm'
import Show from './pages/Show'
import NotFound from './pages/NotFound'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<DefaultLayout />}>
          <Route path='/:id' element={<Show />} />
        </Route>
        <Route path='/mail' element={<MailForm />} />
        <Route path='/properties' element={<PropertiesForm />} />
        <Route path='/login' element={<Login />} />
        <Route element={<BlankLayout />}>
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
