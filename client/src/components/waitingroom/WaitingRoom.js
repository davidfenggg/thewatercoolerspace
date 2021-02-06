import React from 'react'

import WaterCooler from './WaterCooler'

import styled from 'styled-components'

const FullHeight = styled.div`
height: 100vh;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;

`

export default function WaitingRoom(props) {
    return <>

        <FullHeight >
            <WaterCooler />
        </FullHeight>
    </>
}