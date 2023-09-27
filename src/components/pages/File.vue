<script setup lang="ts">
import IconRight from "~icons/carbon/chevron-right";
import IconClean from "~icons/carbon/clean";
import FileCard from "~/components/FileCard.vue";
import lighthouse from "@lighthouse-web3/sdk";
import { apiKey as _apiKey } from "~/logic/auth-store";
import { localStore } from "~/logic/handle-files";
import { FilecoinFile } from "~/types";

const parsedLocalStore = computed(() => {
  return typeof localStore.value === "string"
    ? JSON.parse(localStore.value)
    : localStore.value;
})
let uploads = ref<FilecoinFile[]>([]);
const fetchUploads = async () => {
  try {
    let response = await lighthouse.getUploads(_apiKey.value);
    uploads.value = response.data.fileList;
  } catch (error) {
    console.log(error);
  }
};
onMounted(() => fetchUploads());

// once records are fetched, check local data and update if cid is not present
watch(uploads, (value: FilecoinFile[])=>{
  const data:FilecoinFile[] = []
  value.map((file: FilecoinFile)=>{
    let found = parsedLocalStore.value.find((localFile: FilecoinFile)=>file.cid === localFile.cid);
    if(!found){
      console.log("not found", file);
      data.push(file);
    }
  })
  if(data.length > 0){
    localStore.value = [...data, ...parsedLocalStore.value]
  }
})
</script>

<template>
  <div class="h-full">
    <section class="h-full w-full flex flex-col">
      <h2 class="font-bold"><icon-right class="inline-block" /> files</h2>
      <div class="flex-grow mt-3 overflow-y-auto">
        <div class="grid grid-cols-2 gap-2 w-full">
          <FileCard
            v-for="(file, i) in parsedLocalStore" :key="i"
            :cId="file.cid"
            :type="file.mimeType"
            :userFile="file"
            src="https://encodeclub.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Ff271b8ae-36f5-4425-af81-847a2314368f%2Fspeakers_09.png?id=20760a46-29b5-4944-b851-a0b21976f7fe&table=block&spaceId=d0c8094a-e610-4814-9977-ce61e347ef5a&width=690&userId=&cache=v2"
            :encrypted="file.encryption"
          />
        </div>
      </div>
      <!-- empty state -->
      <div v-if="parsedLocalStore.length == 0" class="flex-grow flex">
        <div class="w-full h-full flex items-center justify-center">
          <div
            class="w-[300px] h-[300px] flex items-center justify-center flex-col"
          >
            <div
              class="w-[100px] h-[100px] flex items-center justify-center bg-emerald-500/10 rounded-full"
            >
              <icon-clean class="w-[50px] h-[50px] text-emerald-500" />
            </div>

            <div class="mt-4">
              <h3 class="text-center">Nothing to see here</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
