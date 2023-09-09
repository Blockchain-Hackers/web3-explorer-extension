<script setup lang="ts">
// import { storageDemo } from '~/logic/storage'
import Account from "~/components/pages/Account.vue";
import File from "~/components/pages/File.vue";
// import FileView from '~/components/pages/FileView.vue'
import Home from "~/components/pages/Home.vue";
import ImportExport from "~/components/pages/ImportExport.vue";

const navList = [
  { name: "Home", slug: "home", component: Home },
  { name: "File", slug: "file", component: File },
  { name: "Import / Export", slug: "import-export", component: ImportExport },
  { name: "Account", slug: "account", component: Account },
];
const activeNav = ref(navList[0]);

// function openOptionsPage() {
//   browser.runtime.openOptionsPage()
// }
</script>

<template>
  <main class="w-[400px] h-[400px] flex bg-gray-50">
    <aside
      class="w-[100px] min-w-[100px] max-w-[100px] border-r-2 border-emerald-600/10"
    >
      <div class="w-full mt-4 flex px-3">
        <Logo />
      </div>

      <div class="w-full mt-4">
        <NuxtLink
          v-for="(nav, i) in navList"
          :key="i"
          @click="activeNav = nav"
          :class="{
            'bg-emerald-800/30 hover:bg-emerald-800/30':
              activeNav.name === nav.name,
          }"
          class="block w-full p-3 border-b last-of-type:border-b-none border-emerald-600/10 hover:bg-emerald-600/10 cursor-pointer text-emerald-900 transition-all duration-200 font-bold"
        >
          {{ nav.name }}
        </NuxtLink>
      </div>
    </aside>
    <div class="p-2 overflow-y-auto text-gray-600 w-full">
      <component :is="activeNav.component" />
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
