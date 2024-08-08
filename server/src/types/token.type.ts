import { Types } from 'mongoose';

export type TToken = {
    refreshToken: string;
    ip: string,
    userAgent: string
    isValid: boolean,
    user: Types.ObjectId
}