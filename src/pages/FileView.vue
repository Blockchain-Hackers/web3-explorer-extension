<script setup lang="ts">
import IconCopy from '~icons/mdi/content-copy'
import Link from '~/components/Link.vue'

const copied = ref(false)
const CopyText = async (text: string)=>{
  try {
    await navigator.clipboard.writeText(text)
    copied.value = true
    setTimeout(()=>copied.value = false, 1000)
  } catch (err) {
  }
}

const details = ref([
  { name: 'CID', value: '0xadsdsndjsidnnondinisndsbi' },
  { name: 'Type', value: 'image' },
  { name: 'Date added', value: '12th Jan 2022' },
  { name: 'Status', value: 'Active' },
  { name: 'File name', value: 'If we can get this.png' },
])

const options = ref([
  { name: 'Open Url', path: '/open' },
  { name: 'Renew', path: '/renew' },
  { name: 'Repair', path: '/repair' }
])
</script>

<template>
  <div class="w-full h-full flex flex-col">
    <div class="bg-gray-100 h-20 rounded-lg overflow-hidden shadow">
      <img
        src="https://encodeclub.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Ff271b8ae-36f5-4425-af81-847a2314368f%2Fspeakers_09.png?id=20760a46-29b5-4944-b851-a0b21976f7fe&table=block&spaceId=d0c8094a-e610-4814-9977-ce61e347ef5a&width=690&userId=&cache=v2"
        class="w-full h-full object-cover">
    </div>

    <div class="pt-2 flex-grow flex flex-col">
      <div class="flex-grow">
        <p
          :class="{ '!text-emerald-600': copied }"
          class="truncate inline-block transition-all duration-300 cursor-pointer pr-2 hover:!text-emerald-600"
          @click="CopyText('0xadsdsndjsidnnondinisndsbi')">
          CID:
          <strong :class="{ '!text-emerald-600': copied }" class="text-black">0xadsdsndjsidnnondinisndsbi</strong>
          <icon-copy class="inline ml-1" />
        </p>
  
        <div>
          <template v-for="detail in details">
            <p
              v-if="detail.name !== 'CID'"
              class="flex justify-between border-b last-of-type:border-b-none py-1">
              {{ detail.name }}: <strong class="text-black ml-1">{{ detail.value }}</strong>
            </p>
          </template>
        </div>
      </div>

      <div class="flex gap-2 justify-between text-sm">
        <Link v-for="option in options" class="w-full text-center">
          {{ option.name }}
        </Link>
      </div>
    </div>
  </div>
</template>