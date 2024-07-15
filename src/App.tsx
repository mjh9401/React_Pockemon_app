import React from 'react'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import MainPage from './pages/MainPage'
import DetailPage from './pages/DetailPage'
import LoginPage from './pages/LoginPage'
import NavBar from './components/NavBar'

const LayOut = () =>{
  return(
    <>
      <NavBar/>
      <br/>
      <br/>
      <br/>
      <Outlet/>
    </>
  )
}


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LayOut/>}>
          <Route index element={<MainPage/>}/>
          <Route path='/pokemon/:id' element={<DetailPage/>}/>
          <Route path='login' element={<LoginPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App