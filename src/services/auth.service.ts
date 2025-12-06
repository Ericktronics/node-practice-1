import jwt from "jsonwebtoken";

export const generateToken = (payload: object, secret: string, options?: jwt.SignOptions): string => {
    
    return jwt.sign(payload, secret, options);
};

export const verifyToken = (token: string, secret: string): object | string => {
    return jwt.verify(token, secret);
};