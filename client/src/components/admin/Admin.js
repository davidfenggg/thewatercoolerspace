import React, { useState } from "react";
import { Button, Input, Space, Modal } from "antd";

import styled from "styled-components";

const InputField = styled(Input)`
  width: 30rem;
`;

export default function Admin(props) {
  const [orgName, setOrgName] = useState("");
  const [pin, setPin] = useState('');
  const [organizationId, setOrgId] = useState('');

  const [vis, setVis] = useState(true);

  function onSubmit() {
    console.log(orgName);
    setVis(false);
  }

  const generateID = () => {
    if (!orgName) {
      return "";
    }

    let id = orgName.replaceAll(' ', '');
    if (id.length > 5) {
      id = id.substring(0, 5);
      id += '-' + (Math.ceil(Math.random() * 9000 + 1000))
    } else {
      id += '-' + (Math.ceil(Math.random() * 9000 + 1000))
    }

    return id;
  }

  return (
    <Modal
      visible={vis}
      width="50%"
      onCancel={() => {
        setVis(false);
      }}
      onOk={(e) => onSubmit()}
    >
      <h1>Create New Organization</h1>
      <Space direction="vertical">
        <Space>  
      <p>Name of Organization</p>
           <InputField
          onChange={(e) => setOrgName(e.target.value)}
          value={orgName}
          placeholder="UOttawa, Inc."
          size="large"
        />
        </Space>
        <Space>
        <p>Security PIN</p>

          <InputField
            onChange={(e) => setPin(e.target.value)}
            value={pin}
            placeholder="0000"
            size="large"
          />
        </Space>
        <Space>
        <p>Organization ID to share</p>
          <InputField
            value={generateID(orgName)}
            placeholder="Organization ID"
            size="large"
            disabled
          />
        </Space>

      </Space>

    </Modal>
  );
}
