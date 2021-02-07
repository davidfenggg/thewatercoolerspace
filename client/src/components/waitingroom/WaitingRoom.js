import { React, useState, useEffect } from "react";

import WaterCooler from "./WaterCooler";

import PlayerList from "./PlayerList";

import { Button, Space } from "antd";

import VoteModal from "./VoteModal";
import Admin from "../admin/Admin.js";
import styled from "styled-components";

import { getSocket } from 'socket.io-client';

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

  useEffect(() => {

    

    setLeft([]);
    setRight([]);

    for (let i = 0; i < players.length; i++) {
      if (i % 2 === 0) {
        setLeft((left) => [...left, players[i]]);
      } else {
        setRight((right) => [...right, players[i]]);
      }
    }
  }, []);

  return (
    <>
      <SpacePadded direction="horizontal" size={100}>
        <PlayerList>{left}</PlayerList>
        <WaterCooler>
          <Space direction="vertical" size="large">
            <Button type="primary" size="large">
              JOIN GAME
            </Button>
            <Button type="primary" size="large">
              JOIN ZOOM
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
