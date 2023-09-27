import { encryptionSignature } from "./useCIDEncryption";
import lighthouse from "@lighthouse-web3/sdk";

export const decryptCIDFile = async (cid: string) => {
  const { publicKey, signedMessage } = await encryptionSignature();

  const keyObject = await lighthouse.fetchEncryptionKey(
    cid,
    publicKey,
    signedMessage
  );

  const fileType = "image/jpeg";
  const decrypted = await lighthouse.decryptFile(
    cid,
    keyObject.data.key as string,
    fileType
  );

  const url = URL.createObjectURL(decrypted);
  return url;
};
