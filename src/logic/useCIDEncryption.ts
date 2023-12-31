import sha256, { rpcProvider } from "./sha256";

import { apiKey } from "./auth-store";
import axios from "axios";
import { ethers } from "ethers";
import lighthouse from "@lighthouse-web3/sdk";

export const imageTypeRef = ref("");

const helperURL = "https://extension-backend.onrender.com/decrypt-file";
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
  let decrypted = null;
  // const url = URL.createObjectURL(decrypted);
  // return url;

  try {
    const response = await axios.post(
      helperURL,
      {
        apiKey: apiKey.value,
        cid: cid,
      },
      {
        responseType: "arraybuffer",
        headers: {
          "Accept-Encoding": "gzip, deflate, br",
          Accept: "*/*",
        },
      }
    );

    decrypted = response.data;
    imageTypeRef.value = response.headers["content-type"];
    return decrypted;
  } catch (error) {
    // display toast
  }
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
