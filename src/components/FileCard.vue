<script setup lang="ts">
import IconMenu from "~icons/mdi/dots-vertical";
import { vOnClickOutside } from "@vueuse/components";

interface Props {
  src: string;
  type: string;
  cId: string;
}
defineProps<Props>();

const copied = ref(false);
const CopyText = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    copied.value = true;
    setTimeout(() => (copied.value = false), 1000);
  } catch (err) {}
};

const showMenu = ref(false);

const options = ref([
  { name: "Open Url", path: "/open" },
  { name: "Renew", path: "/renew" },
  { name: "Repair", path: "/repair" },
]);
</script>

<template>
  <div class="w-full rounded-lg shadow border border-gray-200">
    <div class="bg-gray-100 h-20 rounded-lg overflow-hidden">
      <img :src="src" class="w-full h-full object-cover" />
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
      <p>Type: {{ type }}</p>

      <button
        @click="() => (showMenu = true)"
        class="absolute right-1 top-2 bg-white py-1 px-0"
      >
        <icon-menu class="text-black text-base cursor-pointer font-bold" />
      </button>

      <div
        v-if="showMenu"
        v-on-click-outside="() => (showMenu = false)"
        class="absolute right-2 top-2 bg-gray-800 text-white shadow p-1 rounded-md"
      >
        <a
          v-for="(opt, i) in options"
          :key="i"
          to="/file"
          class="block p-1 hover:bg-gray-700 rounded-md cursor-pointer"
        >
          {{ opt.name }}
        </a>
      </div>
    </div>
  </div>
</template>
