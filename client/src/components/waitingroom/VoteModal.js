import React, { useEffect, useState } from "react";

import { Space, Modal, Button, message } from "antd";
import styled from "styled-components";
import { getSocket } from "../../services/socket";

const BorderDiv = styled.div`
  ${(props) => (props.border ? "border: 1px solid black;" : "")}
`;

export default function VoteModal(props) {
  //https://ant.design/components/modal/#header

  const [visible, setVisible] = useState(false);
  const [option, setOption] = useState(null);

  const [game1, setGame1] = useState({});
  const [game2, setGame2] = useState({});
  const [game3, setGame3] = useState({});


  const open = () => {
    setVisible(true);
  }

  const close = () => {
    setVisible(false);
  }

  const setGames = (g1, g2, g3) => {
    setGame1(g1);
    setGame2(g2);
    setGame3(g3);
  }


  const vote = (selection) =>{
    if (!option) {
      setOption(selection);

      getSocket().emit('vote', selection-1)
      
    } else {
      message.error('You have already voted!');
    }
  }

  useEffect(() => {
    // wait for voting start

    getSocket().on('start-voting', s => {
      setGames(s.games[0], s.games[1], s.games[2]);

      open();

    });

    getSocket().on('start-game', s => {

      close();

    });
    // opens up modal
    
    //voting end
    
    //emit stuff
    
    //closes the modal
  }, []);

  return (
    <Modal closable={false} visible={visible} footer="" width="80%">
      <h1 style={{ fontSize: "40px", textAlign: "center" }}>
        Click Emoji to Vote!
      </h1>
      <div className="row">
        <BorderDiv className="column" border={option === 1}>
          <h1 style={{ position: "relative" }}>{game1.name}</h1>
          <button
            onClick={() => {
              vote(1);
            }}
            className="circle"
            style={{ backgroundColor: "#14BECC" }}
          >
            {game1.logo}
          </button>
          <p style={{ position: "relative" }}></p>
          <p style={{ position: "relative" }}>
            {game1.description}
          </p>
        </BorderDiv>
        <BorderDiv className="column" border={option === 2}>
          <h1 style={{ position: "relative" }}>{game2.name}</h1>
          <button
            onClick={() => {
              vote(2);

            }}
            className="circle"
            style={{ backgroundColor: "#FF4051" }}
          >
                        {game2.logo}

          </button>
          <p style={{ position: "relative" }}></p>
          <p style={{ position: "relative" }}>
          {game2.description}

          </p>
        </BorderDiv>
        <BorderDiv className="column" border={option === 3}>
          <h1 style={{ position: "relative" }}>{game3.name}</h1>
          <button
            onClick={() => {
              vote(3);

            }}
            className="circle"
            style={{ backgroundColor: "#CC1481" }}
          >
            {game3.logo}
          </button>
          <p style={{ position: "relative" }}></p>
          <p style={{ position: "relative" }}>
           {game3.description}
          </p>
        </BorderDiv>
      </div>
    </Modal>
  );
}
