<script setup lang="ts">
import { storageDemo } from "~/logic/storage";

function openOptionsPage() {
  browser.runtime.openOptionsPage();
}
function loop() {
  let array = [1,23,3]
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    console.log(element);
  }
}
</script>

<template>
  <main class="w-[300px] px-4 py-5 text-center text-gray-700">
    <Logo />
    <div>Popup</div>
    <SharedSubtitle />

    <button class="btn mt-2" @click="openOptionsPage">Open Options</button>
    <div class="mt-2">
      <span class="opacity-50">Storage:</span> {{ storageDemo }}
    </div>
  </main>
</template>
