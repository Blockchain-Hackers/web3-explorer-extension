<script setup lang="ts">
import IconRight from "~icons/carbon/chevron-right";
import { export2JSON, readFile, localStore } from "~/logic/handle-files";

// interface FilecoinFile {
//   cid: string;
//   createdAt: number;
//   encryption: boolean;
//   fileName: string;
//   fileSizeInBytes: string;
//   id: string;
//   lastUpdate: number;
//   mimeType: string;
//   publicKey: string;
//   status: string;
//   txHash: string;
// }

const handleFileSelection = async (file: any) => {
  const res = await readFile(file)
  console.log({ res })
}

const handleFileExport = () => export2JSON(JSON.parse(String(localStore.value)))
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
            type="file"
            accept=".json"
            @change="(e) => handleFileSelection(e.target?.files[0])"
            class="appearance-none hidden"
          />
        </label>
        <Link @click="handleFileExport" class="w-full text-center py-10"> Export files </Link>
      </div>
    </section>
  </div>
</template>
