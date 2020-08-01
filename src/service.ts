import { runServer } from './server';

const { SERVER_PORT } = process.env;

runServer(parseInt(SERVER_PORT, 10));
