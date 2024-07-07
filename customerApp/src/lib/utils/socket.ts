import {Socket, io} from 'socket.io-client';

interface ServerToClientEvents {
  invalidToken: () => void;
  pickedUpOrder: (data: {data: string}) => void;
  TrackingOrder: (data: {orderId: string; lat: number; lng: number}) => void;
}

interface ClientToServerEvents {
  ping: () => void;
  JoinRoom: (data: {room: string}) => void;
  LeaveRoom: (data: {room: string}) => void;
}

export const initSocket = () => {
  console.log('init socket');

  const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
    'https://apishippy.nguyenconggioi.me',
    {
      transports: ['websocket'],
    },
  );

  return socket;
};
