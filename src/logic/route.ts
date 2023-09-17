import Account from "~/components/pages/Account.vue";
import File from "~/components/pages/File.vue";
import Home from "~/components/pages/Home.vue";
import ImportExport from "~/components/pages/ImportExport.vue";
import Upload from "~/components/pages/Upload.vue";
import { useStorageLocal } from "~/composables/useStorageLocal";


import IconHome from "~icons/carbon/home";
import IconUpload from "~icons/carbon/ibm-cloud-citrix-daas";
import IconOther from "~icons/carbon/share-knowledge";
import IconUser from "~icons/carbon/user";

export const navList = [
  { name: "Home", component: Home, icon: IconHome },
  { name: "Uploads", component: File, icon: IconUpload },
  { name: "Other Files", component: ImportExport, icon: IconOther },
  { name: "Account", component: Account, icon: IconUser },
];

export const hiddenNavs = [
  { name: "Upload", slug: "upload", component: Upload },
];

export const activeNav = useStorageLocal("activeNav", navList[0]);
