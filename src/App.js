import "./App.css";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";
import { useState } from "react";
import JoinGame from "./components/JoinGame/JoinGame";
import Home from "./components/Home/Home";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';


function App() {
  const api_key = "ajg2xrrp9xnq";
  const cookies = new Cookies();
  const token = cookies.get("token");
  const client = StreamChat.getInstance(api_key);
  const [isAuth, setIsAuth] = useState(false);

  const logOut = () => {
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("firstName");
    cookies.remove("lastName");
    cookies.remove("hashedPassword");
    cookies.remove("channelName");
    cookies.remove("username");
    client.disconnectUser();
    setIsAuth(false);
  };

  if (token) {
    client
      .connectUser(
        {
          id: cookies.get("userId"),
          name: cookies.get("username"),
          firstName: cookies.get("firstName"),
          lastName: cookies.get("lastName"),
          hashedPassword: cookies.get("hashedPassword"),
        },
        token
      )
      .then((user) => {
        setIsAuth(true);
      });
  }
  return (
    <div className="App">
      {isAuth ? (
        <Chat client={client}>
          <>
           <button id="goBack" onClick={logOut}> <ArrowBackIosNewIcon/> </button>
          <JoinGame />
          </>
        </Chat>
      ) : (
        <>
        <Home setIsAuth={setIsAuth}/>
        </>
      )}
    </div>
  );
}

export default App;
