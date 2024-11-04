export function renameProductImage(files: FileList, userId: string, productId: string | undefined): FileList {
  let dataTransfer: DataTransfer = new DataTransfer();
  const newPictures: File[] = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const fileName = `products/${userId}/${productId}/${file.name}`;
    const newFile = new File([file], fileName, { type: file.type });
    newPictures.push(newFile);
  }

  newPictures.forEach((file) => dataTransfer.items.add(file));
  return dataTransfer.files;
}