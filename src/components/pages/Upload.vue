<script setup>
import IconRight from "~icons/carbon/chevron-right";
import IconCheck from "~icons/mdi/check";
import { ethers } from "ethers";
import lighthouse from "@lighthouse-web3/sdk";
import { encryptionSignature } from "~/logic/useCIDEncryption";
import { apiKey as _apiKey } from "~/logic/auth-store";
import axios from "axios";
const progressCallback = (progressData) => {
  let percentageDone =
    100 - (progressData?.total / progressData?.uploaded)?.toFixed(2);
  console.log(percentageDone);
};

const form = reactive({
  file: null,
  encrypt: true,
});

const handleSubmit = async () => {
  if (form.encrypt) {
    uploadFileEncrypted(form.file);
  } else {
    uploadFile(form.file);
  }
};

const uploadFileEncrypted = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("apiKey", _apiKey.value);

  const url = "https://extension-backend.onrender.com/upload";

  try {
    const response = await axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Set the content type
      },
    });

    console.log("Response:", response.data);
    // Handle the response as needed
  } catch (error) {
    console.error("Error:", error);
    // Handle errors as needed
  }
};

//   // Attach the form submission handler
//   const uploadForm = document.getElementById('upload-form');
//   uploadForm.addEventListener('submit', handleFormSubmit);
// }

const uploadFile = async (file) => {
  try {
    const response = await lighthouse.upload(
      [file],
      _apiKey.value,
      false,
      null,
      progressCallback
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <div class="h-full">
    <section class="h-full w-full flex flex-col">
      <h2 class="font-bold">
        <icon-right class="inline-block" /> Upload Files
      </h2>
      <p class="text-gray-500 font-medium pl-4">Upload a File</p>

      <form @submit.prevent="handleSubmit">
        <div
          class="h-full flex flex-col justify-center items-center flex-wrap gap-2 mt-2 text-sm"
        >
          <label
            class="w-full text-center py-10 border border-dashed border-black bg-emerald-600/10 rounded-md text-emerald-900 hover:bg-emerald-600/20 transition-all duration-300 cursor-pointer"
          >
            select files
            <input
              type="file"
              @change="(e) => (form.file = e.target.files[0])"
              class="appearance-none hidden"
              required
            />
          </label>
          <p v-if="!!form.file">
            Selected File: <strong>{{ form.file?.name }}</strong>
          </p>

          <label class="block w-full cursor-pointer select-none">
            <input
              v-model="form.encrypt"
              type="checkbox"
              name="account-type"
              class="appearance-none peer"
            />
            <div
              class="border-2 peer-checked:border-black text-gray-300 peer-checked:text-black rounded-md p-4 py-2 font-medium flex justify-between peer-checked:[&>.check]:text-emerald-600"
            >
              <IconCheck class="text-lg check" />
              <span>Encrypt</span>
            </div>
          </label>

          <button class="block bg-emerald-600 w-full p-2 rounded-md text-white">
            upload
          </button>
        </div>
      </form>
    </section>
  </div>
</template>

<!-- <script>
  // Function to handle form submission
  async function handleFormSubmit(event) {
    event.preventDefault();

    const fileInput = document.getElementById('file-input');
    const apiKeyInput = document.getElementById('api-key-input');

    const formData = new FormData();
    formData.append('file', fileInput.files[0]);
    formData.append('apiKey', apiKeyInput.value);

    const url = 'https://extension-backend.onrender.com/upload';

    try {
      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the content type
        },
      });

      console.log('Response:', response.data);
      // Handle the response as needed
    } catch (error) {
      console.error('Error:', error);
      // Handle errors as needed
    }
  }

  // Attach the form submission handler
  const uploadForm = document.getElementById('upload-form');
  uploadForm.addEventListener('submit', handleFormSubmit);
</script> -->
