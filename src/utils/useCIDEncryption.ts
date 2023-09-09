import { ethers } from "ethers";
import lighthouse from "@lighthouse-web3/sdk";

export const encryptionSignature = async () => {
  const provider = new ethers.providers.Web3Provider((window as any).ethereum);
  const signer = provider.getSigner();
  const address = await signer.getAddress();
  const messageRequested = (await lighthouse.getAuthMessage(address)).data
    .message;
  const signedMessage = await signer.signMessage(messageRequested);
  return {
    signedMessage: signedMessage,
    publicKey: address,
  };
};

const decryptCIDFile = async (cid: string) => {
  const { publicKey, signedMessage } = await encryptionSignature();

  const keyObject = await lighthouse.fetchEncryptionKey(
    cid,
    publicKey,
    signedMessage,
  );

  const fileType = "image/jpeg";
  const decrypted = await lighthouse.decryptFile(
    cid,
    keyObject.data.key as string,
    fileType,
  );

  const url = URL.createObjectURL(decrypted);
  return url;
};
