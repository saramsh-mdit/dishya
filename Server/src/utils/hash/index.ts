import crypto from "node:crypto";

const secret = "random_key";

export const getHash = (text:string) => {
    const hash = crypto.createHmac('sha256',secret).update(text).digest("base64");
    return hash;
}

export const checkHash = (hash:string,text:string) => {
    const newHash = getHash(text);
    if(newHash === hash) return true;
    else return false
}
