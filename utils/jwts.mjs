import jwt from 'jsonwebtoken';
import { getEnvOrThrow } from './helpers.mjs';

const JWT_SECRET = getEnvOrThrow(process.env.JWT_SECRET);
const JWT_EXPIRE = getEnvOrThrow(process.env.JWT_EXPIRE);

export function generateToken(payload) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRE });
}

export function verifyToken(token) {
    return jwt.verify(token, JWT_SECRET);
}