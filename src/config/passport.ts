import { ExtractJwt, StrategyOptions } from 'passport-jwt';
import models from '../models';
import { config } from './config';

const User = models.user;
const jwtOptions: StrategyOptions = {
    secretOrKey: config.jwt.secret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    passReqToCallback: true,
};
