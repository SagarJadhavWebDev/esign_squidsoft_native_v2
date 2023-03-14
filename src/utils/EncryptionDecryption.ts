import CryptoJS from "crypto-js";

const encrypt = (value: string, key: string, iv: string) => {
  const mykey = CryptoJS.SHA256(key).toString(CryptoJS.enc.Hex);
  const myiv = CryptoJS.SHA256(iv).toString(CryptoJS.enc.Hex);
  const finalKey = mykey.slice(0, 32);
  const finalIv = myiv.slice(0, 16);
  const encrypted = CryptoJS.AES.encrypt(
    value,
    CryptoJS.enc.Utf8.parse(finalKey),
    {
      iv: CryptoJS.enc.Utf8.parse(finalIv),
      mode: CryptoJS.mode.CBC,
      format:CryptoJS.format.OpenSSL
    }
  );
  console.log("ENCRYPTED:",encrypted);
  return encrypted?.ciphertext?.toString(CryptoJS.enc.Base64);
};
const decrypt = (value: string, key: string, iv: string) => {
  const mykey = CryptoJS.SHA256(key).toString(CryptoJS.enc.Hex);
  const myiv = CryptoJS.SHA256(iv).toString(CryptoJS.enc.Hex);
  const finalKey = mykey.slice(0, 32);
  const finalIv = myiv.slice(0, 16);
  const decrypted = CryptoJS.AES.decrypt(
    value,
    CryptoJS.enc.Utf8.parse(finalKey),
    { iv: CryptoJS.enc.Utf8.parse(finalIv), mode: CryptoJS.mode.CBC }
  );
 // console.log("DECRYPTED:",decrypted);
  return decrypted?.toString(CryptoJS.enc.Utf8);
};
const EncryptDecrypt = {
  encrypt: encrypt,
  decrypt: decrypt,
};

export default EncryptDecrypt;