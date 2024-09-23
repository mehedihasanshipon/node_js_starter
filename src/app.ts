import cors from 'cors';
import express, { Express, NextFunction, Request, Response } from 'express';
import fileUpload from 'express-fileupload';
import helmet from 'helmet';
import httpStatus from 'http-status';
import redisClient from './config/redisClient';
import ApiError from './helper/ApiError';
import { errorConverter, errorHandler } from './middlewares/error';
import routes from './route';

process.env.PWD = process.cwd();

export const app: Express = express();

// To enable securities in HTTP headers
app.use(helmet());

// enable cors
// options for cors middleware
app.use(
    cors({
        origin: '*',
    })
);
app.use(fileUpload());
app.use(express.static(`${process.env.PWD}/public`));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/api/solid/v1/test', async (req, res) => {
    res.status(200).send('Congratulations! Invoice builder API is working!');
});

app.use('/api/v1/starter', routes);

// send back a 404 error for any unknown api request
app.use((req: Request, res: Response, next: NextFunction) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);
// handle error
app.use(errorHandler);
// pg.defaults.parseInt8 = true;

redisClient.on('error', (err) => {
    console.log(err);
    redisClient.quit();
});
redisClient.connect();

redisClient.on('ready', () => {
    console.log('Redis connected');
});
