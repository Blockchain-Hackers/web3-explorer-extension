// import lighthouse from '@lighthouse-web3/sdk'
const lighthouse = require("@lighthouse-web3/sdk");
require("dotenv").config();
const apiKey = process.env.LIGHTHOUSE_KEY;
// Import the necessary modules here, if any

async function main() {
  const uploadResponse = await lighthouse.upload(
    //   "/Users/myestery/Desktop/screenshots/Screenshot 2022-06-17 at 23.13.26.png",
    "https://m.media-amazon.com/images/I/81H4hn1jOaL._AC_UY436_FMwebp_QL65_.jpg",
    apiKey,
    false,
    {
      deal_duration: 10,
    },
  );

  //   // You can continue with your code here after the await statement
  //   // For example:
  console.log(uploadResponse);

  const publicKey = apiKey;
  const uploads = await lighthouse.getUploads(publicKey);
  //   lighthouse.upload();

  // Display the list of uploaded files
  console.log(uploads.data.fileList);
}

// Call the async function at the top level
main()
  .then(() => {
    // Handle any additional logic or exit the program here if needed
  })
  .catch((error) => {
    console.error("An error occurred:", error);
  });
