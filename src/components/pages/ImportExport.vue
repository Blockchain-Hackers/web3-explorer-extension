<script setup lang="ts">
import IconRight from "~icons/carbon/chevron-right";
import { export2JSON, readFile, localStore } from "~/logic/handle-files";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

interface FilecoinFile {
  cid: string;
  createdAt: number;
  encryption: boolean;
  fileName: string;
  fileSizeInBytes: string;
  id: string;
  lastUpdate: number;
  mimeType: string;
  publicKey: string;
  status: string;
  txHash: string;
}

const resetInput = ref(false)
const handleFileSelection = async (e: any) => {
  const file = e.target?.files[0]
  const res = await readFile(file)
  let countOfImported = 0
  let countOfNotImported = 0

  const localStoreFiles = typeof localStore.value === 'string' ? JSON.parse(localStore.value) : localStore.value
  res.map((file: FilecoinFile) => {
    if(file?.cid) {
      // check if cid is already in localStore, if not, add it
      const fileExists = localStoreFiles.find((f: FilecoinFile) => f.cid === file.cid)
      if(!fileExists) {
        localStoreFiles.push(file)
        localStore.value = localStoreFiles
        countOfImported++
      } else {
        countOfNotImported++
      }
    } else {
      countOfNotImported++
    }
  })

  if(countOfImported > 0) {
    toast.success(`${countOfImported} files imported`)
  } else if(countOfNotImported > 0) {
    toast.error(`${countOfNotImported} files not imported`)
  }

  // reset file input
  resetInput.value = true
  setTimeout(()=>resetInput.value = false)
}

const handleFileExport = () => export2JSON(typeof localStore.value === 'string' ? JSON.parse(localStore.value) : localStore.value)
</script>

<template>
  <div class="h-full">
    <section class="h-full w-full flex flex-col">
      <h2 class="font-bold">
        <icon-right class="inline-block" /> import or export
      </h2>
      <p class="text-gray-500 font-medium pl-4">Import or export your files</p>
      <div
        class="h-full flex flex-col items-center flex-wrap gap-2 mt-10 text-sm"
      >
        <label
          class="w-full text-center py-10 border border-dashed border-black bg-emerald-600/10 rounded-md text-emerald-900 hover:bg-emerald-600/20 transition-all duration-300 cursor-pointer"
        >
          Import files
          <input
            v-if="!resetInput"
            type="file"
            accept=".json"
            @change="handleFileSelection"
            class="appearance-none hidden"
          />
        </label>
        <Link @click="handleFileExport" class="w-full text-center py-10"> Export files </Link>
      </div>
    </section>
  </div>
</template>
