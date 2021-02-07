import { React, useState, useEffect } from "react";

import WaterCooler from "./WaterCooler";

import PlayerList from "./PlayerList";

import { Button, Space } from "antd";

import VoteModal from "./VoteModal";
import Admin from "../admin/Admin.js";
import styled from "styled-components";

import { getSocket } from "../../services/socket";

const SpacePadded = styled(Space)`
  padding-top: 50px;
`;

export default function WaitingRoom(props) {
  const players = [
    "Michael",
    "Dwight",
    "Pam",
    "Jim",
    "Toby",
    "Andy",
    "Creed",
    "Ryan",
    "Angela",
    "Stanley",
  ];

  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);

  const [gameStarted, setGameStarted] = useState(false);

  const [gameObject, setGameObject] = useState({});

  const requestVoting = () => {
    getSocket().emit('request-games');
  }

  const updateList = (names) => {
    setLeft([]);
    setRight([]);

    for (let i = 0; i < names.length; i++) {
      if (i % 2 === 0) {
        setLeft((left) => [...left, names[i]]);
      } else {
        setRight((right) => [...right, names[i]]);
      }
    }
  }

  useEffect(() => {

    getSocket().on('room-status', s => {
      updateList(s.names);

    })


    getSocket().on('start-game', s => {
      setGameStarted(true);
      setGameObject(s.game);
      console.log(s)

    });


  }, []);

  return (
    <>

      <SpacePadded direction="horizontal" size={200}>


        <PlayerList>{left}</PlayerList>
        <WaterCooler>
          <Space direction="vertical" size="large">
            {gameStarted && <a href={gameObject.link}>  <Button type="primary" size="large">
              JOIN {gameObject.name}
            </Button>
            </a>}
            {!gameStarted && <div style={{ position: 'absolute', top: '-5', left: '46%' }}><Button 

              disabled={left.length === 1 && right.length === 0} onClick={requestVoting} type="primary" size="large">
              START GAME
            </Button></div>}
          </Space>
        </WaterCooler>
        <PlayerList>{right}</PlayerList>
      </SpacePadded>

      <VoteModal />
      <Admin />
      <p style={{ position: 'absolute', bottom: '0', right: '0', left: '0' }}>Press start game when all users are in</p>

    </>
  );
}
