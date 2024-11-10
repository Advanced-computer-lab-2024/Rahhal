import { storage } from "@/utils/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

type UploadableFile = {
  name: string;
  data: Blob | Uint8Array | ArrayBuffer;
  mimetype?: string;
};

export async function uploadFile(file: UploadableFile): Promise<string> {
  
  const fileRef = ref(storage, file.name);

  const metadata = {
    contentType: file.mimetype || "application/octet-stream",
  };

  

  try {
    const uploadDocument = uploadBytesResumable(fileRef, file.data, metadata);
    return new Promise((resolve, reject) => {
      uploadDocument.on(
        "state_changed",
        () => {
          // Don't fetch downloadURL here, just track progress
        },
        (err) => {
          console.log(err);
          reject(err); // Handle unsuccessful uploads
        },
        () => {
          // Get download URL here
          getDownloadURL(uploadDocument.snapshot.ref)
            .then((url: string) => {
              console.log(url);
              resolve(url); // Handle successful uploads on complete
            })
            .catch(reject);
        },
      );
    });
  } catch (error) {
    // Error Handling here
    console.error(error);
    throw error;
  }
}

export async function uploadMultipleFiles(files: { [key: string]: UploadableFile }): Promise<string[]> {
  const urls: string[] = [];

  
  // loop over all keys in files object
  for (const key in files) {
    const file = files[key];
    const url = await uploadFile(file);
    urls.push(url);
  }
  return urls;
}
