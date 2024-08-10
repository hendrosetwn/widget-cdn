import CryptoJS from 'crypto-js';

const secret = process.env.NEXT_PUBLIC_SECRET_KEY ? process.env.NEXT_PUBLIC_SECRET_KEY : 'secret';
const saltString = process.env.NEXT_PUBLIC_SECRET_SALT ? process.env.NEXT_PUBLIC_SECRET_SALT : 'salt';
const saltHex = Buffer.from(saltString, 'utf8').toString('hex');
const salt = CryptoJS.enc.Hex.parse(saltHex);

const key = CryptoJS.PBKDF2(secret, salt, {
  keySize: 256 / 32,
  iterations: 74,
  hasher: CryptoJS.algo.SHA256,
});

const iv = CryptoJS.lib.WordArray.create([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

export function encryptAES(strToEncrypt: string) {
  try {
    const encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(strToEncrypt), key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return encrypted.toString();
  } catch (e) {
    return `Error while encrypting: ${e}`;
  }
}

export function decryptAES(strToDecrypt: string) {
  try {
    const decrypted = CryptoJS.AES.decrypt(strToDecrypt, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
  } catch (e) {
    return `Error while decrypting: ${e}`;
  }
}
