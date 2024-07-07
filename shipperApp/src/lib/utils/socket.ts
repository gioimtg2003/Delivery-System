import {Socket, io} from 'socket.io-client';

export interface ServerToClientEvents {
  invalidToken: () => void;
  cancelOrder: (data: {idOrder: string}) => void;
}

interface ClientToServerEvents {
  ping: () => void;
  JoinRoom: (data: {room: string}) => void;
  TrackingOrder: (data: {
    transport: string;
    orderId: string;
    lat: number;
    lng: number;
  }) => void;
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
