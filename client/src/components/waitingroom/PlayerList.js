import React from "react";
import styled from "styled-components";
import { List } from "antd";

export default function PlayerList(props) {
  return (
    <div>
      <List>
        {props.children.map((name) => (
          <li style={{ fontSize: "25px" }} key={name}>
            {name}
          </li>
        ))}
      </List>
    </div>
  );
}
