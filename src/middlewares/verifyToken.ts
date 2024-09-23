import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
// import ModifiedRequest from '../@types/modify';
import { redisConstant } from '../config/constant';
import { logger } from '../config/logger';
import UserDao from '../dao/implementations/UserDao';
import responseHandler from '../helper/responseHandler';
import RedisService from '../service/implementations/RedisService';
import { setTimezoneVariable } from '../config/timezone';

/*
 * Add Date: 14th June, 2023
 * Modification Date: 14th June, 2023
 * Change By: Mohiuddin
 * Check user api key with redis.
 * Call getUserApiKey() from server is : RedisService();
 * @return: This function return user info or null;
 */
const checkWithApiKey = async (apiKey) => {
    let user;
    try {
        const redisApiKey = redisConstant.USER_BY_APIKEY_REDIS_KEY + apiKey;
        const redisService = new RedisService();

        const redisUserInfo = await redisService.getUserApiKey(redisApiKey);

        if (redisUserInfo && redisUserInfo.id && redisUserInfo.team_id && redisUserInfo.timezone) {
            user = redisUserInfo;
        } else {
            const userDao = new UserDao();
            user = await userDao.getUserByApiKey(apiKey);

            if (user) {
                redisService.setUserByApiKey(redisApiKey, 3000, user);
            }
            return user;
        }
    } catch (error) {
        logger.error(error);
        return null;
    }

    if (user) {
        return user;
    }

    return null;
};

/*
 * Add Date: 14th June, 2023
 * Modification Date: 14th June, 2023
 * Change By: Mohiuddin
 * Check user api key token for verification request.
 * Call verifyToken() from server is : RedisService();
 * Call inner function: checkWithApiKey() for check api key from redis
 * @return: If not found return bad request. if found go to next();
 */

export const verifyToken = () => async (req: Request, res: Response, next: NextFunction) => {
    // Get api key from authorization
    const token = req.headers?.authorization;

    let apiKey = '';

    if (token) {
        const apiKeyParts = token.split(' ');

        if (apiKeyParts.length > 1) {
            // eslint-disable-next-line prefer-destructuring
            apiKey = apiKeyParts[1];
        }
    }

    // Check api key, if key is not found then return bad request message
    if (!apiKey || apiKey == null || apiKey === undefined) {
        const response = responseHandler.returnError(
            httpStatus.BAD_REQUEST,
            'Your auth token is invalid!'
        );
        res.status(httpStatus.BAD_REQUEST).send(response);
        next(res);
    }
    // Check User Api Key From Redis
    const redisKey = await checkWithApiKey(apiKey);

    // Check api key in {redis server}, if key is not found then return bad request message
    if (!redisKey || redisKey == null || redisKey === undefined) {
        const response = responseHandler.returnError(
            httpStatus.BAD_REQUEST,
            'Your auth token is invalid!'
        );
        res.status(httpStatus.BAD_REQUEST).send(response);
        next(res);
    }

    // Add new data to the request body
    // req.body.user_id = redisKey.id;
    setTimezoneVariable(redisKey.timezone);
    // Add new data to the request body
    req.userInfo = redisKey;

    // Create a new property on req to store the modified data

    return next();
};
