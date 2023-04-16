import jwt from 'jsonwebtoken'

export const SECRET = "SECRET";

export const createToken = (data: { _id: string }) => {
    return jwt.sign(data, SECRET);
}

export const verifyToken = (token:string) => {
    const decoded = jwt.verify(token, SECRET);
    return decoded as { _id: string; iat: number };
}