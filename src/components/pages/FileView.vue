<script setup lang="ts">
import IconCopy from "~icons/mdi/content-copy";
import Link from "~/components/Link.vue";
import { cId, userFile } from "~/logic/file-view-handler";
const fileDetails = JSON.parse(userFile.value);
const copied = ref(false);
const CopyText = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    copied.value = true;
    setTimeout(() => (copied.value = false), 1000);
  } catch (err) {}
};

const details = ref([
  { name: "CID", value: fileDetails.cid },
  { name: "Type", value: fileDetails.mimeType },
  { name: "Date added", value: new Date(fileDetails.createdAt).toDateString() },
  { name: "Status", value: fileDetails.status },
  { name: "File name", value: fileDetails.fileName },
  { name: "File size(bytes)", value: fileDetails.fileSizeInBytes },
  { name: "Encryption", value: fileDetails.encryption },
]);

const options = ref([
  { name: "Open Url", path: "/open" },
  { name: "Renew", path: "/renew" },
  { name: "Repair", path: "/repair" },
]);
</script>

<template>
  <div class="w-full h-full flex flex-col">
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

    <div class="pt-2 flex-grow flex flex-col">
      <div class="flex-grow flex flex-col">
        <div class="flex flex-col">
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

        <h3>People file is shared with</h3>
        <div class="flex-grow relative mt-1">
          <div class="absolute inset-0 overflow-y-auto mb-3">
            <div v-for="n in 6">I don't know how to do this yet</div>
          </div>
        </div>
      </div>

      <div class="flex gap-2 justify-between text-sm">
        <Link
          v-for="option in options"
          class="w-full text-center"
          :href="`https://ipfs.io/ipfs/${cId}`"
        >
          {{ option.name }}
        </Link>
      </div>
    </div>
  </div>
</template>
