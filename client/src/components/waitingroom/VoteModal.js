import React, {useEffect, useState} from 'react'


import {getSocket} from '../../services/socket';
import {Modal} from 'antd';


export default function VoteModal(props) {
    //https://ant.design/components/modal/#header
    
    const [visible, setVisible] = useState(false);
    
    useEffect(() => {


        // wait for voting start
        // opens up modal

        //voting end

        //emit stuff
        //closes the modal

    }, [])

    return <Modal visible={true}>

    <p>Oppa</p>

    </Modal>
}