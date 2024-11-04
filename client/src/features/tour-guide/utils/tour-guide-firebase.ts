export function renameItineraryImage(files, userId, itineraryId) {
    let dataTransfer = new DataTransfer();
    const newPictures = [];
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileName = `itineraries/${userId}/${itineraryId}/${file.name}`;
        const newFile = new File([file], fileName, { type: file.type });
        newPictures.push(newFile);
    }
    newPictures.forEach((file) => dataTransfer.items.add(file));
    return dataTransfer.files;
}