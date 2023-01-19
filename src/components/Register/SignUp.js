import React, { useState } from "react";
import Axios from "axios";
import Cookies from "universal-cookie";
import './SignUp.css'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

function SignUp({ setIsAuth, setLogin, setHome, setRegister }) {
  const cookies = new Cookies();
  const [user, setUser] = useState(null);

  const signUp = () => {
    Axios.post("https://witty-lime-tuxedo.cyclic.app/signup", user).then((res) => {
      const { token, userId, firstName, lastName, username, hashedPassword } =
        res.data;
      cookies.set("token", token);
      cookies.set("userId", userId);
      cookies.set("username", username);
      cookies.set("firstName", firstName);
      cookies.set("lastName", lastName);
      cookies.set("hashedPassword", hashedPassword);
      setIsAuth(true);
    });
  };
  function goBack(){
    setLogin(false)
    setRegister(false)
    setHome(true)
  }
  return (
    <div className="signUp">
      <button id='goBack' onClick={goBack}><ArrowBackIosIcon/></button>
      <br/>
      <label>Create account </label>
      <h1>Let's get to know <br/> you better!</h1>
      <p>Your Name</p>
      <input
        placeholder="Type your name here"
        onChange={(event) => {
          setUser({ ...user, firstName: event.target.value });
        }}
      />
      <br/>
      <p>Email</p>
      <input
        placeholder="Type your email here"
        onChange={(event) => {
          setUser({ ...user, lastName: event.target.value });
        }}
      />
      <br/>
      <p>Username</p>
      <input
        placeholder="Type your username here"
        onChange={(event) => {
          setUser({ ...user, username: event.target.value });
        }}
      />
      <br/>
      <p>Password</p>
      <input
        placeholder="Type your password here"
        type="password"
        onChange={(event) => {
          setUser({ ...user, password: event.target.value });
        }}
      />
      <button id='signup-btn' onClick={signUp}> Register</button>
    </div>
  );
}

export default SignUp;
