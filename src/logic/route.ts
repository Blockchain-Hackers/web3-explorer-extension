import Account from "~/components/pages/Account.vue";
import File from "~/components/pages/File.vue";
// import FileView from '~/components/pages/FileView.vue'
import Home from "~/components/pages/Home.vue";
import ImportExport from "~/components/pages/ImportExport.vue";
import { useStorageLocal } from "~/composables/useStorageLocal";

export const navList = [
  { name: "Home", slug: "home", component: Home },
  { name: "File", slug: "file", component: File },
  { name: "Import / Export", slug: "import-export", component: ImportExport },
  { name: "Account", slug: "account", component: Account },
];

export const activeNav = useStorageLocal("activeNav", navList[0]);
