import React, { useEffect, useState } from "react";

import { getSocket } from "../../services/socket";
import { Space, Modal, Button } from "antd";
import styled from "styled-components";

const BorderDiv = styled.div`
  ${(props) => (props.border ? "border: 1px solid black;" : "")}
`;

export default function VoteModal(props) {
  //https://ant.design/components/modal/#header

  const [visible, setVisible] = useState(false);
  const [option, setOption] = useState(null);

  useEffect(() => {
    // wait for voting start
    // opens up modal
    //voting end
    //emit stuff
    //closes the modal
  }, []);

  return (
    <Modal closable={false} visible={false} footer="" width="80%">
      <h1 style={{ fontSize: "40px", textAlign: "center" }}>
        Click Emoji to Vote!
      </h1>
      <div className="row">
        <BorderDiv className="column" border={option === 1}>
          <h1 style={{ position: "relative" }}>Game 1</h1>
          <button
            onClick={() => {
              if (!option) {
                setOption(1);
              }
            }}
            className="circle"
            style={{ backgroundColor: "#14BECC" }}
          >
            🍑
          </button>
          <p style={{ position: "relative" }}></p>
          <p style={{ position: "relative" }}>
            There is unrest in the Galactic Senate. Several thousand solar
            systems have declared their intentions to leave the Republic. This
            Separatist movement, under the leadership of the mysterious Count
            Dooku, has made it difficult for the limited number of Jedi Knights
            to maintain peace and order in the galaxy. Senator Amidala, the
            former Queen of Naboo, is returning to the Galactic Senate to vote
            on the critical issue of creating an ARMY OF THE REPUBLIC to assist
            the overwhelmed Jedi....
          </p>
        </BorderDiv>
        <BorderDiv className="column" border={option === 2}>
          <h1 style={{ position: "relative" }}>Game 2</h1>
          <button
            onClick={() => {
              if (!option) {
                setOption(2);
              }
            }}
            className="circle"
            style={{ backgroundColor: "#FF4051" }}
          >
            🍋
          </button>
          <p style={{ position: "relative" }}></p>
          <p style={{ position: "relative" }}>
            It is a dark time for the Rebellion. Although the Death Star has
            been destroyed, Imperial troops have driven the Rebel forces from
            their hidden base and pursued them across the galaxy. Evading the
            dreaded Imperial Starfleet, a group of freedom fighters led by Luke
            Skywalker has established a new secret base on the remote ice world
            of Hoth. The evil lord Darth Vader, obsessed with finding young
            Skywalker, has dispatched thousands of remote probes into the far
            reaches of space.…
          </p>
        </BorderDiv>
        <BorderDiv className="column" border={option === 3}>
          <h1 style={{ position: "relative" }}>Game 3</h1>
          <button
            onClick={() => {
              if (!option) {
                setOption(1);
              }
            }}
            className="circle"
            style={{ backgroundColor: "#CC1481" }}
          >
            🍉
          </button>
          <p style={{ position: "relative" }}></p>
          <p style={{ position: "relative" }}>
            The dead speak! The galaxy has heard a mysterious broadcast, a
            threat of REVENGE in the sinister voice of the late EMPEROR
            PALPATINE. GENERAL LEIA ORGANA dispatches secret agents to gather
            intelligence, while REY, the last hope of the Jedi, trains for
            battle against the diabolical FIRST ORDER. Meanwhile, Supreme Leader
            KYLO REN rages in search of the phantom Emperor, determined to
            destroy any threat to his power.…
          </p>
        </BorderDiv>
      </div>
    </Modal>
  );
}
