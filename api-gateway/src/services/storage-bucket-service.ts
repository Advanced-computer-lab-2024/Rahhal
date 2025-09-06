import { storage } from "@/utils/storage-bucket";

type UploadableFile = {
  name: string;
  data: Blob | Uint8Array | ArrayBuffer;
  mimetype?: string;
};

export async function uploadFile(file: UploadableFile): Promise<string> {
  try {
    const bucket = storage.from('rahhal-public');
    const { data, error } = await bucket.upload(file.name, file.data, {
      contentType: file.mimetype || 'application/octet-stream',
      upsert: true
    });

    if (error) {
      throw error;
    }

    const { data: publicUrl } = bucket.getPublicUrl(file.name);
    return publicUrl.publicUrl;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function uploadMultipleFiles(files: { [key: string]: UploadableFile }): Promise<string[]> {
  const urls: string[] = [];
  
  for (const key in files) {
    const file = files[key];
    const url = await uploadFile(file);
    urls.push(url);
  }
  return urls;
}
