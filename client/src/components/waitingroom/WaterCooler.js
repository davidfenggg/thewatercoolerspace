import React from 'react';

import WaterCoolerImage from '../../assets/water_cooler.png';

import styled from 'styled-components';

const Image = styled.img`

width: 15%;
min-width: 200px;

`;

export default function WaterCooler (props) {
   return <Image src={WaterCoolerImage}/>
}