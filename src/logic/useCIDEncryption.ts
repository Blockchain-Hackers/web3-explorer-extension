import { ethers } from "ethers";
import lighthouse from "@lighthouse-web3/sdk";
import sha256, { rpcProvider } from "./sha256";
import { apiKey } from "./auth-store";
import axios from "axios";

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

export const shareCIDFile = async (shareeAddress: string, cid: string) => {
  const { publicKey, signedMessage } = await encryptionSignature();
  console.log({ shareeAddress, cid });
  const res = await lighthouse.shareFile(
    publicKey,
    [shareeAddress],
    cid,
    signedMessage
  );

  console.log(res);

  return res;
};
export const applyAccessConditions = async (cid: string) => {
  const conditions = [
    {
      id: 1,
      chain: "Optimism",
      method: "getBlockNumber",
      standardContractType: "",
      returnValueTest: {
        comparator: ">=",
        value: "13349",
      },
    },
  ];
  const aggregator = "([1])";
  const { publicKey, signedMessage } = await encryptionSignature();

  const response = await lighthouse.applyAccessCondition(
    publicKey,
    cid,
    signedMessage,
    conditions,
    aggregator
  );

  console.log(response);

  return response;
};

const register_job = async (cid: any) => {
  const formData = new FormData();
  const requestReceivedTime = new Date();
  const endDate = requestReceivedTime.setMonth(
    requestReceivedTime.getMonth() + 1
  );
  const replicationTarget = 2;
  const epochs = 4; // how many epochs before deal end should deal be renewed
  formData.append("cid", cid);
  formData.append("endDate", `${endDate}`);
  formData.append("replicationTarget", `${replicationTarget}`);
  formData.append("epochs", `${epochs}`);

  const response = await axios.post(
    `https://calibration.lighthouse.storage/api/register_job`,
    formData
  );
  console.log(response.data);
};
