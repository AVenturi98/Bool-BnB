import { BrowserRouter, Routes, Route } from 'react-router'
import DefaultLayout from './layouts/DefaultLayout'
import NotFound from './layouts/NotFound'

function App() {

  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<DefaultLayout />}>
        </Route>
        <Route path='*'>
          <Route element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
