import * as crypto from 'crypto';

const AES_INIT_VECTOR = 'B[f{es3y{~>G7WV:';
const AES_SECURITY_KEY = 'r(;J{~nAHnUhdK94NtA,CtcZVkd:@z$R';
const SF_ENCRYPTION_KEY = 'Y4u0/L7byfO5u/TJWhvsmg==';
const initVector = AES_INIT_VECTOR;
const Securitykey = AES_SECURITY_KEY;
const SfSecurityKey = SF_ENCRYPTION_KEY;

export const md5 = (text) =>
  crypto.createHash('md5').update(text, 'utf8').digest('hex');

export const aesEncrypt = (text) => {
  const cipher = crypto.createCipheriv('aes-256-cbc', Securitykey, initVector);
  let encryptedData = cipher.update(text, 'utf-8', 'hex');
  encryptedData += cipher.final('hex');
  return encryptedData;
};

export const aesDecrypt = (encryptedData) => {
  const decipher = crypto.createDecipheriv(
    'aes-256-cbc',
    Securitykey,
    initVector,
  );
  let decryptedData = decipher.update(encryptedData, 'hex', 'utf-8');
  decryptedData += decipher.final('utf8');
  return decryptedData;
};

export const decryptSfString = (encryptedText) => {
  try {
    encryptedText = decodeURIComponent(encryptedText);
    const KEY = Buffer.from(SfSecurityKey, 'base64');
    const encryptedBlob = Buffer.from(encryptedText, 'base64');
    const iv = encryptedBlob.slice(0, 16);
    const textBuffer = encryptedBlob.toString('base64', 16);

    const decipher = crypto.createDecipheriv('aes-128-cbc', KEY, iv);
    let clearText = decipher.update(textBuffer, 'base64', 'utf-8');
    clearText += decipher.final('utf-8');
    return clearText;
  } catch (error) {
    return null;
  }
};
