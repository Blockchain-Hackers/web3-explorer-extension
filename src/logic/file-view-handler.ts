import { useStorageLocal } from "~/composables/useStorageLocal";
import { activeNav } from "~/logic/route";
import FileView from '~/components/pages/FileView.vue'

const cId = useStorageLocal("last-viewed-cid", "");
const fileViewHandler = (cid: string) => {
  cId.value = cid;
  activeNav.value = { name: "FileView", component: FileView }
}

export {
  cId,
  fileViewHandler
}