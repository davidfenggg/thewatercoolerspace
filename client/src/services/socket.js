import { io } from 'socket.io-client';

const socket = io("10.103.10.195:6060");


 export function getSocket() {
    return socket;
}