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

    getSocket().on('start-voting', s => {
      console.log(s)

    })

    getSocket().on('start-voting', s => {
      console.log(s)

    })

 
  }, []);

  return (
    <>
      <SpacePadded direction="horizontal" size={100}>
        <PlayerList>{left}</PlayerList>
        <WaterCooler>
          <Space direction="vertical" size="large">
            {gameStarted && <> <Button type="primary" size="large">
              JOIN GAME
            </Button>
            <Button type="primary" size="large">
              JOIN ZOOM
            </Button> </>}
            <p style={{width: '150px'}}>Press start game when all users are in</p>
            <Button type="primary" size="large">
              START GAME
            </Button>
          </Space>
        </WaterCooler>
        <PlayerList>{right}</PlayerList>
      </SpacePadded>

      <VoteModal />
      <Admin />
    </>
  );
}
