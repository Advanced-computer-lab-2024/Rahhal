export function renameHistoricalPlaceImage(files: FileList, userId: string, historicalPlaceId: string | undefined): FileList {
    let dataTransfer: DataTransfer = new DataTransfer();
    const newPictures: File[] = [];
  
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileName = `historicalPlaces/${userId}/${historicalPlaceId}/${file.name}`;
      const newFile = new File([file], fileName, { type: file.type });
      newPictures.push(newFile);
    }
  
    newPictures.forEach((file) => dataTransfer.items.add(file));
    return dataTransfer.files;
  }