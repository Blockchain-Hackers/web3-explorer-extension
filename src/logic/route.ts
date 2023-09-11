import Account from "~/components/pages/Account.vue";
import File from "~/components/pages/File.vue";
import Home from "~/components/pages/Home.vue";
import ImportExport from "~/components/pages/ImportExport.vue";
import Upload from "~/components/pages/Upload.vue";
import { useStorageLocal } from "~/composables/useStorageLocal";

export const navList = [
  { name: "Home", component: Home },
  { name: "Uploads", component: File },
  { name: "Other Files", component: ImportExport },
  { name: "Account", component: Account },
];

export const hiddenNavs = [
  { name: "Upload", slug: "upload", component: Upload },
];

export const activeNav = useStorageLocal("activeNav", navList[0]);
