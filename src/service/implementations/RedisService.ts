import redisClient from '../../config/redisClient';
import RedisHelper from '../../helper/RedisHelper';
import IRedisService from '../contracts/IRedisService';

export default class RedisService implements IRedisService {
    private redisHelper: RedisHelper;

    constructor() {
        this.redisHelper = new RedisHelper(redisClient);
    }

    // Get user api key from redis server with {key}
    getUserApiKey = async (key: string) => {
        const user = await this.redisHelper.get(key);

        if (user != null) {
            return JSON.parse(user);
        }
        return false;
    };

    // Set user information into redis server with a
    setUserByApiKey = async (key: string, seconds: number, valueParam: string | object) => {
        const setUser = await this.redisHelper.setEx(key, seconds, valueParam);

        if (!setUser) {
            return true;
        }
        return false;
    };
}
