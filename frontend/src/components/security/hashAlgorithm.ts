import CryptoJS from 'crypto-js';

export default function hashAlgorithm(value: string): string {
  return CryptoJS.SHA256(value).toString(CryptoJS.enc.Hex);
};
