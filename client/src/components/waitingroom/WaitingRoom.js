import React from 'react'

import WaterCooler from './WaterCooler'

import { Button, Space } from 'antd';




export default function WaitingRoom(props) {
    return <>

            <WaterCooler>

                <Space direction='vertical' size="large">
                    <Button type="primary" size="large">JOIN GAME</Button>
                    <Button type="primary" size="large">JOIN ZOOM</Button>
                </Space>
            </WaterCooler>
    </>
}