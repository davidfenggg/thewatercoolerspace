import React from "react";

import WaterCoolerImage from "../../assets/water_cooler.png";

import styled from "styled-components";

const Image = styled.img`

width: 15%;
min-width: 200px;
margin: auto;
position: absolute;
top: 0; left: 0; bottom: 0; right: 0;
`;

const Container = styled.div`

padding-top: 23rem;

`

export default function WaterCooler(props) {
    return <div>

        <Image src={WaterCoolerImage} />

        <Container>
            {props.children}
        </Container>
    </div>;
}
