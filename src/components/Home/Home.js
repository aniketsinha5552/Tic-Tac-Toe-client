import React, { useState } from 'react'
import Login from '../Login/Login'
import SignUp from '../Register/SignUp'
import './Home.css'


export default function Home({setIsAuth}) {
  const [login, setLogin]= useState(false)
  const [register, setRegister]= useState(false)
  const [home, setHome]= useState(true)

  function loginPage(){
    setLogin(true)
    setRegister(false)
    setHome(false)
  }
  function signupPage(){
    setLogin(false)
    setRegister(true)
    setHome(false)
  }

  function HomePage(){
    return(
      <div id='home'>
      
      <p>async</p>
      <h1>tic tac <br/> toe</h1>
      
      <button id='login-btn' onClick={loginPage} >Login</button>
      <br/>
      <button id='reg-btn' onClick={signupPage}>Register</button>
      
    </div>
    )
  }
  
  return (
    <>
      {login && <Login setIsAuth={setIsAuth}  setLogin={setLogin} setHome={setHome} setRegister={setRegister}/>}
      {register && <SignUp setIsAuth={setIsAuth}  setLogin={setLogin} setHome={setHome} setRegister={setRegister}/>}
       {home && <HomePage  setLogin={setLogin} setHome={setHome} setRegister={setRegister}/>}
    </>
  )
}
