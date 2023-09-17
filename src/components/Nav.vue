<script setup lang="ts">
import { activeNav, navList } from "~/logic/route";

// set default active nav
activeNav.value = navList[0];
</script>

<template>
  <aside
    class="w-[120px] min-w-[120px] border-r border-black/10"
  >
    <div class="w-full mt-4 flex px-3">
      <Logo />
    </div>

    <div class="w-full mt-4 flex flex-col gap-2">
      <a
        v-for="(nav, i) in navList"
        :key="i"
        @click="activeNav = nav"
        :class="{
          'bg-emerald-800/10 hover:bg-emerald-800/20 !text-emerald-700':
            activeNav.name === nav.name,
        }"
        class="block w-full p-3 py-2 hover:bg-emerald-600/10 cursor-pointer text-gray-500
        transition-all duration-200 font-bold flex items-center gap-2 relative"
      >
      <component :is="nav.icon" class="text-base" />
      {{ nav.name }}
      <span
        v-if="activeNav.name === nav.name"
        class="absolute right-0 w-1 bg-emerald-600 h-full max-h-[60%] rounded-l-full">
      </span>
      </a>
    </div>
  </aside>
</template>