import React, { useState } from "react";
import { Button, Input, Space, Modal } from "antd";

import styled from "styled-components";

const InputField = styled(Input)`
  width: 30rem;
`;

export default function Admin(props) {
  const [orgName, setOrgName] = useState("");
  const [vis, setVis] = useState(true);

  function onSubmit() {
    console.log(orgName);
    setVis(false);
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
      <h1>Creaate New Organization</h1>
      <InputField
        onChange={(e) => setOrgName(e.target.value)}
        value={orgName}
        placeholder="Enter organization name"
        size="large"
      />
    </Modal>
  );
}
