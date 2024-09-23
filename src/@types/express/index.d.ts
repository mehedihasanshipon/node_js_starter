import { IUser } from '../../models/db_pypepro/interfaces/IUser';

declare global {
    namespace Express {
        interface Request {
            userInfo?: IUser;
            files?: {
                files: {
                    name: string;
                    data: Buffer;
                };
            };
        }
    }
}
