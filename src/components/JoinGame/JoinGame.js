import React, { useState } from "react";
import { useChatContext, Channel } from "stream-chat-react";
import Game from "../Game/Game";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import './JoinGame.css'

function JoinGame() {
  const [rivalUsername, setRivalUsername] = useState("");
  const { client } = useChatContext();
  const [channel, setChannel] = useState(null);
  const createChannel = async () => {
    console.log(rivalUsername)
    const response = await client.queryUsers({ name: { $eq: rivalUsername } });

    if (response.users.length === 0) {
      alert("User not found");
      return;
    }

    const newChannel = await client.channel("messaging", {
      members: [client.userID, response.users[0].id],
    });

    await newChannel.watch();
    setChannel(newChannel);
  };
  return (
    <>
      {channel ? (
        <Channel channel={channel} >
          <Game channel={channel} setChannel={setChannel} rival={rivalUsername}/>
        </Channel>
      ) : (
        <div className="joinGame">
          {/* <button id="goBack"><ArrowBackIosNewIcon/></button> */}
          <h4>Start a new game</h4>
          <h1>Whom do you want <br/> to play with?</h1>
          <p>Username</p>
          <input
            placeholder="Type their username here"
            onChange={(event) => {
              setRivalUsername(event.target.value);
            }}
          />
          <br/>
          <button id="signup-btn" onClick={createChannel}> Start Game</button>
        </div>
      )}
    </>
  );
}

export default JoinGame;
