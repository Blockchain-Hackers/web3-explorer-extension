<script setup lang="ts">
import { storageLocal } from "~/composables/useStorageLocal";
import IconRight from "~icons/carbon/chevron-right";
import lighthouse from "@lighthouse-web3/sdk";
import { apiKey as _apiKey } from "~/logic/auth-store";

const apiKey = ref(_apiKey.value);
const isLoggedIn = ref(!!apiKey.value);
const notifications = ref({
  showError: false,
  showSuccess: false,
});

const text = computed(() => {
  return isLoggedIn.value
    ? {
        title: "Disconnect Lighthouse Account",
        description:
          "Your Files will still be visible but you cannot renew or repair them",
        button: "Disconnect",
      }
    : {
        title: "Connect Lighthouse Account",
        description:
          "You can only perform actions like repair and renew after connecting your account",
        button: "Connect",
      };
});

watch(_apiKey, (value) => {
  isLoggedIn.value = !!value;
});

watch(apiKey, (value) => {
  notifications.value.showError = false;
});

const handleSubmit = async () => {
  // if storage apikey is set, remove; else set

  // logout
  if (_apiKey.value) {
    storageLocal.removeItem("apiKey");
    _apiKey.value = "";
    return;
  }

  // try to login
  let balance: any;
  try {
    balance = await lighthouse.getUploads(apiKey.value);
    console.log(balance);

    // Display the balance details

    storageLocal.setItem("apiKey", apiKey.value);
    _apiKey.value = apiKey.value;
    notifications.value.showSuccess = true;
  } catch (error) {
    console.log(error);
    notifications.value.showError = true;
  }
};
</script>

<template>
  <div class="h-full">
    <section class="h-full w-full flex flex-col">
      <h2 class="font-bold">
        <icon-right class="inline-block" /> {{ text.title }}
      </h2>
      <p class="pl-4 text-gray-500 font-medium">{{ text.description }}</p>
      <p
        v-if="notifications.showSuccess"
        class="pl-4 text-green-500 font-medium"
      >
        Your account has been connected successfully
      </p>
      <div class="flex-grow flex mt-10">
        <form @submit.prevent="handleSubmit" class="w-full">
          <label v-if="!isLoggedIn" class="relative block">
            <span class="absolute text-base pl-4 pt-1">Enter your API key</span>
            <input
              v-model="apiKey"
              type="text"
              placeholder="xxxxxxx.XXXXXXXXXXXXXXXXXXXXXXXX"
              required
              class="w-full bg-gray-100 p-4 pt-7 rounded-md outline-emerald-700/30 text-base"
            />
          </label>

          <div v-if="notifications.showError" class="text-red-500 text-sm mt-2">
            Could not connect to your account. Please check your API key and
            network connection.
          </div>

          <button class="block bg-emerald-600 w-full p-2 rounded-md text-white">
            {{ text.button }}
          </button>
        </form>
      </div>
    </section>
  </div>
</template>
