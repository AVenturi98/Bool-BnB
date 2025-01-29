
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
import MyProperties from './components/MyProperties'
import { GlobalProvider } from './contexts/GlobalContext'




function App() {
  const setOwnerName = () => {
    if (localStorage.getItem("ownerName") !== null) {
      return localStorage.getItem("ownerName");
    } else {
      return "";
    }
  }
  const setAuthenticated = () => {
    if (localStorage.getItem("token") !== null) {
      return true;
    } else {
      return false;
    }
  }
  const authenticated = setAuthenticated();
  console.log(authenticated);
  console.log(localStorage.getItem("token"));



  return (
    <BrowserRouter>

      <GlobalProvider>
        <AuthProvider>
          <Routes>

            <Route path='/' element={<DefaultLayout authenticated={authenticated} setAuthenticated={setAuthenticated} />}>

              <Route path='/' element={<PropertiesList />} />
              <Route path='/my-properties' element={<MyProperties />} />
              <Route path='/properties/:id' element={<Show />} />
              <Route path='/mail' element={<MailForm />} />
              <Route path='/properties' element={<PropertiesForm />} />
              <Route path='/login' element={<Login setOwnerName={setOwnerName} authenticated={authenticated} setAuthenticated={setAuthenticated} />} />
            </Route>
            <Route element={<BlankLayout />}>
              <Route path='*' element={<NotFound />} />
            </Route>
          </Routes>
        </AuthProvider>
      </GlobalProvider>
    </BrowserRouter>
  )
}

export default App
