import { io } from 'socket.io-client';

const socket = io("localhost:6060");


 export function getSocket() {
    return socket;
}