<script setup>
import IconRight from '~icons/carbon/chevron-right'
import { ethers } from 'ethers';
import lighthouse from '@lighthouse-web3/sdk';
const progressCallback = (progressData) => {
  let percentageDone =
    100 - (progressData?.total / progressData?.uploaded)?.toFixed(2);
  console.log(percentageDone);
};


const uploadFileEncrypted = async (file) => {

  const sig = await encryptionSignature();
  const response = await lighthouse.uploadEncrypted(
    file,
    "YOUR_API_KEY",
    sig.publicKey,
    sig.signedMessage,
    null,
    progressCallback
  );
  console.log(response);

}

</script>

<template>
  <div class="h-full">
    <section class="h-full w-full flex flex-col">
      <h2 class="font-bold"><icon-right class="inline-block" /> import or export</h2>
      <p class="text-gray-500 font-medium pl-4">
        Import or export your files
      </p>
      <div class="h-full flex flex-col justify-center items-center flex-wrap gap-2 mt-2 text-sm">
        <label class="w-full text-center py-10 border border-dashed border-black
          bg-emerald-600/10 rounded-md text-emerald-900 hover:bg-emerald-600/20
          transition-all duration-300 cursor-pointer">
          select files
          <input type="file" @change="(e) => uploadFileEncrypted(e.target.files)" class="appearance-none hidden" />
        </label>
        <Link class="w-full text-center py-10">
        export your files
        </Link>
      </div>
    </section>
  </div>
</template>