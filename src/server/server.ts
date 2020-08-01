import express from 'express';
import { Server } from 'http';
import bodyParser from 'body-parser';
import { manifestRoutes } from './routes';

const { APIDOC_URI } = process.env;

const runServer = (port: number = 4000): Server => {
    const app = express();

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.use(manifestRoutes);

    return app.listen(port, () => console.info(`Service running on port ${port} ...`));
};

export { runServer };
