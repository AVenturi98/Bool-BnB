import { BrowserRouter, Routes, Route } from 'react-router'
import DefaultLayout from 'react-router'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<DefaultLayout />}>

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
