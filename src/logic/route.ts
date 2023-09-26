import Account from "~/components/pages/Account.vue";
import File from "~/components/pages/File.vue";
import OtherFiles from "~/components/pages/OtherFiles.vue";
import Home from "~/components/pages/Home.vue";
import ImportExport from "~/components/pages/ImportExport.vue";
import Upload from "~/components/pages/Upload.vue";
import { useStorageLocal } from "~/composables/useStorageLocal";

import IconHome from "~icons/carbon/home";
import IconUpload from "~icons/carbon/ibm-cloud-citrix-daas";
import IconOther from "~icons/carbon/share-knowledge";
import IconUser from "~icons/carbon/user";
import IconCloudUpDown from "~icons/carbon/cloud-ceiling";

export const navList = [
  { name: "Home", component: Home, icon: IconHome },
  { name: "Uploads", component: File, icon: IconUpload },
  { name: "Other Files", component: OtherFiles, icon: IconOther },
  { name: "Import / export", component: ImportExport, icon: IconCloudUpDown },
  { name: "Account", component: Account, icon: IconUser },
];

export const hiddenNavs = [
  { name: "Upload", slug: "upload", component: Upload },
];

export const activeNav = useStorageLocal("activeNav", navList[0]);
