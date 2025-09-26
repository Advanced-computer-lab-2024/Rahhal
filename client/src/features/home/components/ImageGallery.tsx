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


  // Responsive layout based on screen size and number of images
  const getGridLayout = () => {
    const imageCount = images.length;

    if (imageCount === 1) {
      return "single";
    } else if (imageCount === 2) {
      return "double";
    } else if (imageCount >= 3) {
      return "multiple";
    }
    return "single";
  };

  const layout = getGridLayout();

  return (
    <div className="mb-2 gap-2">
      {/* Mobile responsive layout for all scenarios */}
      <div className="block sm:hidden">
        {layout === "single" && (
          <div className="w-full h-48">
            {loaded ? (
              <img
                src={images[0]}
                className="w-full h-full object-cover rounded-lg"
                alt="Gallery image"
              />
            ) : (
              <Skeleton className="w-full h-full rounded-lg" />
            )}
          </div>
        )}

        {layout === "double" && (
          <div className="grid grid-cols-1 gap-2">
            {images.slice(0, 2).map((image, index) => (
              <div key={index} className="w-full h-48">
                {loaded ? (
                  <img
                    src={image}
                    className="w-full h-full object-cover rounded-lg"
                    alt={`Gallery image ${index + 1}`}
                  />
                ) : (
                  <Skeleton className="w-full h-full rounded-lg" />
                )}
              </div>
            ))}
          </div>
        )}

        {layout === "multiple" && (
          <div className="space-y-2">
            {/* Main image */}
            <div className="w-full h-48">
              {loaded ? (
                <img
                  src={images[0]}
                  className="w-full h-full object-cover rounded-lg"
                  alt="Main gallery image"
                />
              ) : (
                <Skeleton className="w-full h-full rounded-lg" />
              )}
            </div>
            {/* Remaining images in 2x2 grid */}
            <div className="grid grid-cols-2 gap-1">
              {images.slice(1, 5).map((image, index) => (
                <div key={index + 1} className="relative w-full h-24">
                  {loaded ? (
                    <img
                      src={image}
                      className={cn(
                        "w-full h-full object-cover",
                        index === 0 ? "rounded-tl-lg" :
                        index === 1 ? "rounded-tr-lg" :
                        index === 2 ? "rounded-bl-lg" :
                        index === 3 ? "rounded-br-lg" : ""
                      )}
                      alt={`Gallery image ${index + 2}`}
                    />
                  ) : (
                    <Skeleton
                      className={cn(
                        "w-full h-full",
                        index === 0 ? "rounded-tl-lg" :
                        index === 1 ? "rounded-tr-lg" :
                        index === 2 ? "rounded-bl-lg" :
                        index === 3 ? "rounded-br-lg" : ""
                      )}
                    />
                  )}
                  {/* Show "+X more" overlay on last image if there are more than 5 images */}
                  {index === 3 && images.length > 5 && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-br-lg">
                      <span className="text-white text-xs font-medium">
                        +{images.length - 5} more
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Desktop/Tablet - Original layout restored */}
      <div className="hidden sm:block">
        <div className="grid grid-cols-2 gap-2">
          {loaded ? (
            <img src={images[0]} className="w-full h-full object-cover rounded-l-lg" />
          ) : (
            <Skeleton className="w-full h-full rounded-l-lg" />
          )}

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
      </div>
    </div>
  );
}
export default ImageGallery;
