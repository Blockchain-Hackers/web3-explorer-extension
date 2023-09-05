<script setup>
import IconFire from '~icons/carbon/fire'
import Link from '~/components/Link.vue'

const quickActionLinks = [
  { name: 'Upload File', path: '/upload' },
  { name: 'Connect Account', path: '/connect' },
  { name: 'View Files', path: '/files' },
]
</script>

<template>
  <section class="h-full w-full flex items-center justify-center flex-col">
    <h1 class="text-gray-700 font-medium">
      <strong>Welcome</strong> to FileCoin Explorer
    </h1>
    <div class="mt-10">
      <h2 class="text-center"><icon-fire class="inline-block text-pink-600" /> Quick actions</h2>
      <div class="flex justify-center flex-wrap gap-2 mt-2 text-sm">
        <Link
          v-for="btn in quickActionLinks">
          {{ btn.name }}
        </Link>
      </div>
    </div>
  </section>
</template>