import { cn } from "@/lib/utils";
import { useState , useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
interface ImageGalleryProps {
  images: string[];
}

function ImageGallery({ images }: ImageGalleryProps) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const loadImages = async () => {
      const imagePromises = images.map(
        (src) =>
          new Promise<void>((resolve, reject) => {
            const img = new Image();
            img.src = src;
            img.onload = () => resolve();
            img.onerror = () => reject();
          })
      );

      await Promise.all(imagePromises);
      setLoaded(true);
    };
    loadImages();
  }, [images]);


  return (
    <div className="grid grid-cols-2 gap-2 mb-2">
      {
        loaded ? (
        <img src={images[0]} className="w-full h-full object-cover rounded-l-lg" />
        ) : (
          <Skeleton className="w-full h-full rounded-l-lg" />
        )
      }

      <div className="grid grid-cols-2 gap-2">
        {images.slice(1).map((image, index) => (
           <div key={index} className="relative h-72">
          {loaded ? (

            <img
              src={image}
              className={cn(
                "w-full h-full object-cover",
                index == 1 ? "rounded-tr-lg" : index == 3 ? "rounded-br-lg" : "",
              )}
            />
        
          ) : (
           
              <Skeleton key={index} className={cn(
                "w-full h-full",
                index == 1 ? "rounded-tr-lg" : index == 3 ? "rounded-br-lg" : "",
              )} />
          
          )}
          </div>

        ))}
      </div>
    </div>
  );
}
export default ImageGallery;
