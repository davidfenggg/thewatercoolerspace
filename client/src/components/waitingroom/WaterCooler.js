import React from 'react';

import WaterCoolerImage from '../../assets/water_cooler.png';

import styled from 'styled-components';

const Image = styled.img`

width: 20vw;

`;

export default function WaterCooler (props) {
   return <Image src={WaterCoolerImage}/>
}