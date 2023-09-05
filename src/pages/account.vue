<script setup>
import IconRight from '~icons/carbon/chevron-right'

const apiKey = ref('')
const isLoggedIn = ref(false)
const text = computed(()=>{
  return isLoggedIn.value ? {
    title: 'Disconnect Web3 Storage Account',
    description: 'Your Files will still be visible but you cannot renew or repair them',
    button: 'Disconnect'
  } : {
    title: 'Connect Web3 Storage Account',
    description: 'You can only perform actions like repair and renew after connecting your account',
    button: 'Connect'
  }
})

const handleSubmit = ()=>{
  apiKey.value = ''
  isLoggedIn.value = !isLoggedIn.value
}
</script>

<template>
  <div class="h-full">
    <section class="h-full w-full flex flex-col">
      <h2 class="font-bold"><icon-right class="inline-block" /> {{ text.title }}</h2>
      <p class="pl-4 text-gray-500 font-medium">{{ text.description }}</p>
      <div class="flex-grow flex mt-10">
        <form @submit.prevent="handleSubmit" class="w-full">
          <label v-if="!isLoggedIn" class="relative block">
            <span class="absolute text-base pl-4 pt-1">Enter your API key</span>
            <input
              v-model="apiKey"
              type="text"
              placeholder="0x23cskicsslskllllkdlbicbhsxsale"
              required
              class="w-full bg-gray-100 p-4 pt-7 rounded-md outline-emerald-700/30 text-base">
          </label>
          
          <button
            class="inline-block p-3 bg-emerald-600/10 rounded-md text-black font-medium mt-3
            hover:bg-emerald-700/30 transition-all duration-300 cursor-pointer text-base w-full">
            {{ text.button }}
          </button>
        </form>
      </div>
    </section>
  </div>
</template>