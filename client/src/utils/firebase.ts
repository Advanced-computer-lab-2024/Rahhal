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
  
  if (!files) return [];
  const formData = new FormData();
  for (let i = 0; i < files!.length; i++) {
   
    formData.append("image" + i, files![i]);
    
  }

  const response = await axios.post(SERVICES_URLS.FIREBASE + "/upload-multiple-files", formData);
  const urls: string[] = response.data as string[];
  return urls;
}
