import React, { useState, useEffect } from "react";
import WaterCooler from "../waitingroom/WaterCooler";
import { Button, Input, Space, message } from "antd";

import { getSocket } from "../../services/socket";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import Admin from '../admin/Admin';

const SpacePadded = styled(Space)`
  padding-top: 40px;
`;

const InputField = styled(Input)`
  width: 10rem;
`;

export default function Login(props) {
  const [name, setName] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [pin, setPin] = useState("");
  let history = useHistory();

  useEffect(() => {

    getSocket().on('login-response', e => {
      console.log(e);

      if (e.accepted) {
        history.push(`/company/${e.companyId}/`)
      } else {
        message.error('There was an issue entering this organization.')
      }
    });

  }, [])


  const emitLogin = () => {
    getSocket().emit("login", {
      name: name,
      companyId: companyId,
      pin: pin

    });
  };

  return (
    <>
      <WaterCooler>
        <SpacePadded direction="vertical" size="small">
          <InputField
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Enter your name"
            size="large"
          />
          <InputField
            onChange={(e) => setCompanyId(e.target.value)}
            value={companyId}
            placeholder="Enter Company ID"
            size="large"
          />
          <InputField
            onChange={(e) => setPin(e.target.value)}
            value={pin}
            placeholder="Enter PIN"
            size="large"
          />

          <Button size="large" onClick={emitLogin}>
            Join
          </Button>
        </SpacePadded>
      </WaterCooler>
      <br />
      <br />
      <br />
      <Admin />
    </>
  );
}
