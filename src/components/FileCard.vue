<script setup lang="ts">
import IconMenu from "~icons/mdi/dots-vertical";
import { vOnClickOutside } from "@vueuse/components";
import { fileViewHandler } from "~/logic/file-view-handler";
import { FilecoinFile } from "~/types";

interface Props {
  src: string;
  type: string;
  cId: string;
  userFile: FilecoinFile;
  encrypted: boolean;
}
const props = defineProps<Props>();

const copied = ref(false);
const CopyText = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    copied.value = true;
    setTimeout(() => (copied.value = false), 1000);
  } catch (err) {}
};
const dateCreated = computed(()=>(date: number | null) => {
  if (!date) return "";
  const d = new Date(date);
  return `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`;
})

// const showMenu = ref(false);

// const options = ref([
//   { name: "Open Url", path: "/open" },
//   { name: "Renew", path: "/renew" },
//   { name: "Repair", path: "/repair" },
// ]);


</script>

<template>
  <div class="w-full rounded-lg shadow border border-gray-200">
    <div
      @click="fileViewHandler(cId, props.userFile)"
      class="bg-gray-100 h-20 rounded-lg overflow-hidden cursor-pointer flex items-center justify-center relative"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 40 40"
        lass="w-full h-full object-cover"
        class="place-self-start"
      >
        <path
          fill="#fff"
          d="M6.5 37.5L6.5 2.5 24.793 2.5 33.5 11.207 33.5 37.5z"
        />
        <path
          fill="#788b9c"
          d="M24.586,3L33,11.414V37H7V3H24.586 M25,2H6v36h28V11L25,2L25,2z"
        />
        <g>
          <path
            fill="#fff"
            d="M24.5 11.5L24.5 2.5 24.793 2.5 33.5 11.207 33.5 11.5z"
          />
          <path
            fill="#788b9c"
            d="M25,3.414L32.586,11H25V3.414 M25,2h-1v10h10v-1L25,2L25,2z"
          />
        </g>
      </svg>
      <span class="absolute bg-white rounded-md border-2 px-1 border-slate-500">
        {{ dateCreated(userFile?.createdAt ?? null) }}
      </span>
    </div>
    <div class="p-2 relative">
      <p
        :class="{ '!text-emerald-600': copied }"
        class="truncate transition-all duration-300 cursor-pointer pr-2"
        @click="CopyText(cId)"
      >
        CID:
        <span
          :class="{ '!text-emerald-600': copied }"
          class="text-black font-bold"
          >{{ cId }}</span
        >
      </p>
      <div class="flex gap-3">
        <p>Type: {{ type }}</p>
        <svg
          v-if="encrypted"
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
      </div>

      <!-- <button
        @click="() => (showMenu = true)"
        class="absolute right-1 top-2 bg-white py-1 px-0"
      >
        <icon-menu class="text-black text-base cursor-pointer font-bold" />
      </button>

      <div
        v-if="showMenu"
        v-on-click-outside="() => (showMenu = false)"
        class="absolute right-2 top-2 bg-gray-800 text-white shadow p-1 rounded-md z-10"
      >
        <a
          v-for="(opt, i) in options"
          :key="i"
          to="/file"
          class="block p-1 hover:bg-gray-700 rounded-md cursor-pointer"
        >
          {{ opt.name }}
        </a>
      </div> -->
    </div>
  </div>
</template>
