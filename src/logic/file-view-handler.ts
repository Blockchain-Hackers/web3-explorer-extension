import { useStorageLocal } from "~/composables/useStorageLocal";
import { activeNav } from "~/logic/route";
import FileView from "~/components/pages/FileView.vue";

const cId = useStorageLocal("last-viewed-cid", "");
const userFile = useStorageLocal("userFiles", "");
const fileViewHandler = (cid: string, userFile_: Object) => {
  cId.value = cid;

  userFile.value = JSON.stringify({ ...userFile_ });

  activeNav.value = { name: "FileView", component: FileView };
};

export { cId, fileViewHandler, userFile };
