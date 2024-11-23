import { cn } from "@/lib/utils";
interface ImageGalleryProps {
  images: string[];
}

function ImageGallery({ images }: ImageGalleryProps) {
  return (
    <div className="grid grid-cols-2 gap-2 mb-2">
      <img src={images[0]} className="w-full h-full object-cover rounded-l-lg" />

      <div className="grid grid-cols-2 gap-2">
        {images.slice(1).map((image, index) => (
          <div key={index} className="relative">
            <img
              src={image}
              className={cn(
                "w-full h-full object-cover",
                index == 1 ? "rounded-tr-lg" : index == 3 ? "rounded-br-lg" : "",
              )}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
export default ImageGallery;
