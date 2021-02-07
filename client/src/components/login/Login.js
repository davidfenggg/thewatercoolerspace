import React, { useState } from "react";
import WaterCooler from "../waitingroom/WaterCooler";
import { Button, Input, Space } from "antd";

import { getSocket } from "../../services/socket";
import styled from "styled-components";

const InputField = styled(Input)`
  width: 10rem;
`;

export default function Login(props) {
  const [name, setName] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [pin, setPin] = useState("");

  const emitLogin = () => {
    console.log(name);
    console.log(companyId);
    console.log(pin);
    getSocket().emit("login", {
      name: name,
      companyId: companyId,
      pin: pin

    });
  };

  return (
    <>
      <WaterCooler>
        <Space direction="vertical" size="small">
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
        </Space>
      </WaterCooler>
    </>
  );
}
