import React, { useState } from "react";
import Axios from "axios";
import Cookies from "universal-cookie";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import './Login.css'

function Login({ setIsAuth, setLogin, setHome, setRegister}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const cookies = new Cookies();
  const login = () => {
    Axios.post("https://witty-lime-tuxedo.cyclic.app/login", {
      username,
      password,
    }).then((res) => {
      const { firstName, lastName, username, token, userId } = res.data;
      cookies.set("token", token);
      cookies.set("userId", userId);
      cookies.set("username", username);
      cookies.set("firstName", firstName);
      cookies.set("lastName", lastName);
      setIsAuth(true);
    });
  };

  function loginPage(){
    setLogin(false)
    setRegister(false)
    setHome(true)
  }
  return (
    <div className="login">
      <button id="goBack" onClick={loginPage}><ArrowBackIosIcon/></button>
      <br/>
      <label> Login</label>
      <h1>Please enter your <br/> details</h1>
      <p>Username</p>
      <input
        placeholder="Type your username here"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <br/>
      <p>Password</p>
      <input
        placeholder="Type your password here"
        type="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <br/>
      <button id='signup-btn' onClick={login}> Login</button>
    </div>
  );
}

export default Login;
