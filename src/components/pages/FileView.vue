<script setup lang="ts">
import IconCopy from "~icons/mdi/content-copy";
import Link from "~/components/Link.vue";
import { cId, userFile } from "~/logic/file-view-handler";
import IconLoading from "~icons/mdi/loading";
import lighthouse from "@lighthouse-web3/sdk";
import axios from "axios";
import { decryptCIDFile, shareCIDFile } from "~/logic/useCIDEncryption";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
const fileDetails = JSON.parse(userFile.value);
const copied = ref(false);
const shareeAddress = ref("");
import fileDownload from "js-file-download";

// import { decryptCIDFile } from "~/logic/decryptCIDFile";
const CopyText = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    toast.success("CID copied");
    copied.value = true;
    setTimeout(() => (copied.value = false), 1000);
  } catch (err) {}
};
const isSharingLoading = ref(false);
const details = ref([
  { name: "CID", value: fileDetails.cid },
  { name: "Type", value: fileDetails.mimeType },
  { name: "Date added", value: new Date(fileDetails.createdAt).toDateString() },
  { name: "Status", value: fileDetails.status },
  { name: "File name", value: fileDetails.fileName },
  { name: "File size(bytes)", value: fileDetails.fileSizeInBytes },
  { name: "Encryption", value: fileDetails.encryption },
]);

let sharedTo = ref([]);
let sharedLink = ref("");

let FileUrl = `https://gateway.lighthouse.storage/ipfs/${cId}`;

if (fileDetails.encryption) {
  // decryptCIDFile(cId.value).then((e) => console.log(e));
}

const options = ref([
  { name: "Open Url", path: "/open" },
  { name: "Renew", path: "/renew" },
  { name: "Repair", path: "/repair" },
]);

const shareFile = async () => {
  isSharingLoading.value = true;
  try {
    await shareCIDFile(shareeAddress.value, cId.value);
    toast.success("File shared");
  } catch (error: any) {
    toast.error(error.message);
  } finally {
    isSharingLoading.value = false;
  }
};

const DownloadOrView = async () => {
  if (fileDetails.encryption) {
    const resp = await decryptCIDFile(cId.value);
    // create blob from buffer
    const blob = new Blob([resp], { type: fileDetails.mimeType });
    fileDownload(blob, fileDetails.fileName, fileDetails.mimeType);
  } else {
    window.open(FileUrl, "_blank");
  }
};

const register_job = async (operation: string) => {
  try {
    const formData = new FormData();
    const requestReceivedTime = new Date();
    const endDate = requestReceivedTime.setMonth(
      requestReceivedTime.getMonth() + 1
    );
    const replicationTarget = 2;
    const epochs = 4; // how many epochs before deal end should deal be renewed
    formData.append("cid", cId.value);
    formData.append("endDate", `${endDate}`);
    formData.append("replicationTarget", `${replicationTarget}`);
    formData.append("epochs", `${epochs}`);

    await axios.post(
      `https://calibration.lighthouse.storage/api/register_job`,
      formData
    );
    toast.success(`File ${operation}`);
  } catch (error: any) {
    toast.error(error.message);
  }
};

const accessConditions = async (cid: any) => {
  const response = await lighthouse.getAccessConditions(cid);

  // Print the access conditions
  sharedTo.value = response.data.sharedTo;
  console.log(response.data.sharedTo);
};
onMounted(() => accessConditions(fileDetails.cid));
</script>

<template>
  <div class="w-full h-full flex flex-col">
    <div class="pt-2 flex-grow flex flex-col">
      <div class="flex-grow flex flex-col overflow-y-auto relative">
        <div class="absolute inset-0 overflow-y-auto">
          <div class="bg-gray-100 h-20 rounded-lg overflow-hidden shadow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-full h-full object-cover"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
              />
            </svg>
          </div>

          <div class="flex flex-col mt-2">
            <p
              :class="{ '!text-emerald-600': copied }"
              class="truncate flex transition-all duration-300 cursor-pointer pr-2 hover:!text-emerald-600"
              @click="CopyText(cId)"
            >
              CID:
              <strong
                :class="{ '!text-emerald-600': copied }"
                class="text-black truncate"
                >{{ cId }}</strong
              >
              <icon-copy class="inline ml-1 min-w-6" />
            </p>

            <div>
              <template v-for="detail in details">
                <p
                  v-if="detail.name !== 'CID'"
                  class="flex justify-between border-b last-of-type:border-b-none py-1"
                >
                  {{ detail.name }}:
                  <strong class="text-black ml-1" style="display: flex">
                    {{ detail.value }}&nbsp;
                    <span v-if="detail.name === 'Encryption'">
                      <svg
                        v-if="detail.value"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-4 h-4"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                        />
                      </svg>
                      <svg
                        v-else
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-4 h-4"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                        />
                      </svg>
                    </span>
                  </strong>
                </p>
              </template>
            </div>
          </div>

          <form @submit.prevent="shareFile" class="w-full flex gap-2 mt-2">
            <label class="relative block flex-1">
              <input
                v-model="shareeAddress"
                type="text"
                placeholder="Enter Sharee Address"
                required
                class="w-full bg-gray-100 p-4 py-2 rounded-md outline-none ring ring-inset ring-emerald-700 text-base"
              />
            </label>

            <button
              class="block bg-emerald-600 p-2 px-4 rounded-md text-white"
              style="display: flex; justify-content: center"
            >
              <span v-if="isSharingLoading" style="text-align: center">
                <IconLoading class="animate-spin check" />
              </span>
              <span v-else> Share </span>
            </button>
          </form>

          <span v-if="sharedTo.length !== 0">
            <h3 class="my-3">Addresses file is shared with</h3>
            <div class="flex-grow relative mt-1">
              <div class="overflow-y-auto mb-3">
                <div v-for="address in sharedTo">{{ address }}</div>
              </div>
            </div></span
          >
        </div>
      </div>

      <div class="flex gap-2 justify-between text-sm pt-2">
        <Link class="w-full text-center" @click="DownloadOrView">
          {{ fileDetails.encryption ? "Download" : "Open Url" }}
        </Link>
        <Link class="w-full text-center" @click="register_job('Renew')">
          Renew
        </Link>

        <Link class="w-full text-center" @click="register_job('Repair')">
          Repair
        </Link>
      </div>
    </div>
  </div>
</template>
