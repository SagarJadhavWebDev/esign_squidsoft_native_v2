import EncryptDecrypt from "./EncryptionDecryption";

const request = (payload: any, token: string) => {
  try {
    const data = JSON.stringify(payload);
    console.log("JOSN STRINGFY:", data);
    const e_payload = EncryptDecrypt.encrypt(data, token, token);
    return {
      e_payload: e_payload,
    };
  } catch (error) {
    console.log("EXCEPTION:", error);
  }
};
const response = (payload: any, token: string) => {
  try {
    const data = payload?.e_payload;
    const e_payload = JSON.parse(EncryptDecrypt.decrypt(data, token, token));
    return e_payload;
  } catch (error) {
    console.log("EXCEPTION:", error);
  }
};
const CryptoHandler = {
  request: request,
  response: response,
};
export default CryptoHandler;