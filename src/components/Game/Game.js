import React, { useState } from "react";
import Board from "../Board";
import './Game.css'

function Game({ channel, setChannel ,rival}) {
  const [playersJoined, setPlayersJoined] = useState(
    channel.state.watcher_count === 2
  );
  const [result, setResult] = useState({ winner: "none", state: "none" });

  channel.on("user.watching.start", (event) => {
    setPlayersJoined(event.watcher_count === 2);
  });
  if (!playersJoined) {
    return <div> Waiting for other player to join...</div>;
  }
  return (
    <div className="gameContainer">
      <h1>Game with {rival}</h1>
      
      <Board result={result} setResult={setResult} />
  
      <button
      id="signup-btn"
        onClick={async () => {
          await channel.stopWatching();
          setChannel(null);
        }}
      >
        {" "}
        Leave Game
      </button>
      {result.state === "won" && <div style={{marginTop:"10px"}}> {result.winner} Won The Game</div>}
      {result.state === "tie" && <div  style={{marginTop:"10px"}}> Game Tied</div>}
    </div>
  );
}

export default Game;
