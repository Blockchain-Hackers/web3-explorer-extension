<script setup>
import IconFire from "~icons/carbon/fire";
import Link from "~/components/Link.vue";
import navList from "~/routes";
import { activeNav } from '~/logic/route'

const quickActionLinks = [
  { name: "Upload File", path: "/upload", nav: navList[2] },
  { name: "Connect Account", path: "/connect",  nav: navList[3]},
  { name: "View Files", path: "/files",  nav: navList[1] },
];

const navigate = (btn) => activeNav.value = btn.nav
</script>

<template>
  <section class="h-full w-full flex items-center justify-center flex-col">
    <h1 class="text-gray-700 font-medium">
      <strong>Welcome</strong> to FileCoin Explorer
    </h1>
    <div class="mt-10">
      <h2 class="text-center">
        <icon-fire class="inline-block text-pink-600" /> Quick actions
      </h2>
      <div class="flex justify-center flex-wrap gap-2 mt-2 text-sm">
        <Link
          v-for="(btn, i) in quickActionLinks" :key="i"
          @click="navigate(btn)">
          {{ btn.name }}
        </Link>
      </div>
    </div>
  </section>
</template>
