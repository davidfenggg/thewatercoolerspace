import React from "react";
import WaterCooler from "../waitingroom/WaterCooler";
import { Button, Input, Space } from 'antd';

import styled from 'styled-components'

const InputField = styled(Input)`
width: 10rem;
`

export default function Login(props) {
  return (
    <>
      <WaterCooler >
        <Space direction='vertical' size='small'>
          <InputField placeholder='Enter your name' size="large" />
          <InputField placeholder='Enter Company ID' size="large" />
          <InputField placeholder='Enter PIN' size="large" />

          <Button size="large">Join</Button>
        </Space>
      </WaterCooler>
    </>
  );
}
