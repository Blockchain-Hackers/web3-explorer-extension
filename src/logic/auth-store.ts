import { useStorageLocal } from "~/composables/useStorageLocal";
export const apiKey = useStorageLocal("apiKey", "");
