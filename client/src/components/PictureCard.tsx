import React, { useState } from "react";
import { Camera } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { useRef } from "react";

interface PictureCardProps {
  title: string;
  description: string;
  initialImageSources: string[];
  handleFileUploadCallback: (files: FileList) => void;
}

// Function to handle file upload
const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, imageSources: string[], imageSourcesCallback: (imageSources: string[]) => void, handleFileUploadCallback: (files: FileList) => void) => {
  const files = e.target.files;
  if (files) {
    // ADD FILE UPLOAD LOGIC HERE

    // Loop through the files and add the image sources to the image sources array
    for (let i = 0; i < files.length; i++) {
      imageSourcesCallback([...imageSources, URL.createObjectURL(files[i])]);
    }

    // Call the handle file upload callback
    handleFileUploadCallback(files);


    
  
  }
};

// Function to open the file upload dialog using the file input reference
const openFileUploadDialog = (pictureUploadFieldRef: React.RefObject<HTMLInputElement>) => {
  if (pictureUploadFieldRef.current) {
    pictureUploadFieldRef.current.click();
  }
};

const PictureCard = ({ title, description, initialImageSources, handleFileUploadCallback }: PictureCardProps) => {
  // CONSTANTS
  const MIN_NUMBER_OF_IMAGES: number = 0; // Minimum number of images
  const MAX_NUMBER_OF_IMAGES: number = 3; // Maximum number of images
  
  const [imageSources, setImageSources] = useState<string[]>(initialImageSources); // Image sources
  const pictureUploadFieldRef: React.RefObject<HTMLInputElement> = useRef(null); // Picture upload field reference to open the file dialog when the plus icon is clicked

  const thumbnailImages: string[] = imageSources.slice(MIN_NUMBER_OF_IMAGES, MAX_NUMBER_OF_IMAGES); // Thumbnail images
  const numberOfImages: number = imageSources.length; // Number of images

  let plusIconRotation: string = ""; // Rotation of the plus icon

  // set the rotation of the plus icon based on the number of images
  if (numberOfImages >= MIN_NUMBER_OF_IMAGES && numberOfImages < MAX_NUMBER_OF_IMAGES) {
    plusIconRotation = "rotate-0";
  } else {
    plusIconRotation = "rotate-3";
  }

  return (
    <Card>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-600 mb-4">{description}</p>
        <div
          className="relative bg-white h-48 rounded-lg flex items-center justify-center"
          style={{
            backgroundImage: "url(" + thumbnailImages[0] + ")",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute top-2 left-2 bg-white bg-opacity-75 rounded-full px-2 py-1 text-sm flex items-center">
            <Camera size={16} className="mr-1" />
            <span>{numberOfImages} photos</span>
          </div>

          <div className="absolute bottom-0 left-0 right-0">
            <div className="flex justify-center -mb-4">
              {numberOfImages > 1 && (
                <img
                  className="w-16 h-16 bg-gray-300 rounded-lg shadow-md -mr-2 transform -rotate-3"
                  src={thumbnailImages[1]}
                  alt="Thumbnail"
                />
              )}

              {numberOfImages > 2 && (
                <img
                  className="w-20 h-20 bg-gray-300 rounded-lg shadow-md z-10"
                  src={thumbnailImages[2]}
                  alt="Thumbnail"
                />
              )}

              <Button
                className={
                  "w-16 h-16 bg-gray-300 rounded-lg shadow-md -ml-2 transform " + plusIconRotation
                }
                onClick={() => openFileUploadDialog(pictureUploadFieldRef)}
              >
                <Plus />
              </Button>
              <input
                id="files"
                type="file"
                ref={pictureUploadFieldRef}
                multiple={true}
                accept="image/*"
                onChange={(e) => handleFileUpload(e, imageSources, setImageSources, handleFileUploadCallback)}
                hidden
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PictureCard;
