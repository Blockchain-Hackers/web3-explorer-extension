<script setup lang="ts">
// import { storageDemo } from '~/logic/storage'
import Account from '~/pages/account.vue'

const navList = [
  { name: 'Files', path: '/', active: false },
  { name: 'Import / Export', path: '/about', active: false },
  { name: 'Account', path: '/contact', active: true },
]

// function openOptionsPage() {
//   browser.runtime.openOptionsPage()
// }
</script>

<template>
  <main class="w-[400px] h-[400px] flex bg-gray-50">
    <aside
      class="w-[100px] min-w-[100px] max-w-[100px]
      border-r-2 border-emerald-600/10"
    >
      <div class="w-full mt-4 flex justify-center">
        <Logo class="mx-auto" />
      </div>

      <div class="w-full mt-4">
        <NuxtLink
          v-for="(nav, i) in navList" :key="i"
          :class="{ 'bg-emerald-800/30 hover:bg-emerald-800/30': nav.active }"
          class="block w-full p-3 border-b
          last-of-type:border-b-none border-emerald-600/10
          hover:bg-emerald-600/10 cursor-pointer text-emerald-900
          transition-all duration-200 font-bold"
        >
          {{ nav.name }}
        </NuxtLink>
      </div>
    </aside>
    <div class="p-2 overflow-y-auto text-gray-600 w-full">
      <!-- <Home /> -->
      <!-- <File /> -->
      <!-- <FileView /> -->
      <!-- <ImportExport /> -->
      <Account />
    </div>

    <!-- <Logo />
    <div>Popup</div>
    <SharedSubtitle />

    <button class="btn mt-2" @click="openOptionsPage">Open Options</button>
    <div class="mt-2">
      <span class="opacity-50">Storage:</span> {{ storageDemo }}
    </div> -->
  </main>
</template>
