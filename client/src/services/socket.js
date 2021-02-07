import { io } from 'socket.io-client';

const socket = io("35.209.6.79:6060");


 export function getSocket() {
    return socket;
}