import { SERVICES_URLS } from "@/lib/constants";
import axios from "axios";

export async function uploadToFirebase(
  files: FileList | null,
  owner: string,
  id: string | undefined,
  fileRenameCallback: (files: FileList, owner: string, id: string | undefined) => FileList,
): Promise<string[]> {
  
  if (!files) return [];
  files = fileRenameCallback(files, owner, id ?? "");
  const formData = new FormData();
  for (let i = 0; i < files!.length; i++) {
    
    formData.append("image" + i, files![i]);
   
    
  }
  const response = await axios.post(SERVICES_URLS.FIREBASE + "/upload-multiple-files", formData);
  const urls: string[] = response.data as string[];
  return urls;
}

export async function uploadToFirebaseReady(
  files: File [] | null,
): Promise<string[]> {
  const urls: string[] = [];
  if (!files) return urls;
  for (let i = 0; i < files!.length; i++) {
    const formData = new FormData();
    formData.append("image" + i, files![i]);
    const response = await axios.post(SERVICES_URLS.FIREBASE + "/upload-multiple-files", formData);
    urls.push((response.data as string[])[0]);
  }
  return urls;
}
