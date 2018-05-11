import { CONNECT_TO_IO, DISCONNECT_FROM_IO } from '../actionTypes/io.types';

export const connectToIO = () => ({
  type: CONNECT_TO_IO
});

export const disconnectFromIO = () => ({
  type: DISCONNECT_FROM_IO
});
