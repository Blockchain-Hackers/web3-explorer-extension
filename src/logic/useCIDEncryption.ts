import { ethers } from "ethers";
import lighthouse from "@lighthouse-web3/sdk";
import sha256, { rpcProvider } from "./sha256";
import { apiKey } from "./auth-store";

export const encryptionSignature = async () => {
  const provider = new ethers.providers.JsonRpcProvider(rpcProvider);
  const signer = new ethers.Wallet(await sha256(apiKey.value), provider);
  const address = await signer.getAddress();
  const messageRequested = (await lighthouse.getAuthMessage(address)).data
    .message;
  const signedMessage = await signer.signMessage(messageRequested);
  return {
    signedMessage: signedMessage,
    publicKey: address,
  };
};

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
