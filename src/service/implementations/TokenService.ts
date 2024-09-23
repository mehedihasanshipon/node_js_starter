import TokenDao from '../../dao/implementations/TokenDao';
import ITokenService from '../contracts/ITokenService';
import RedisService from './RedisService';

export default class TokenService implements ITokenService {
    private tokenDao: TokenDao;

    private redisService: RedisService;

    constructor() {
        this.tokenDao = new TokenDao();
        this.redisService = new RedisService();
    }
}
