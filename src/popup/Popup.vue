<script setup lang="ts">
import { activeNav } from "~/logic/route";
import Nav from "~/components/Nav.vue";
</script>

<template>
  <main class="w-[400px] h-[400px] flex bg-gray-50">
    <Nav />
    <div class="p-2 overflow-y-auto text-gray-600 w-full">
      <Suspense>
        <component :is="activeNav.component" />
      </Suspense>
    </div>
  </main>
</template>
