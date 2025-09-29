import { Card } from "@/components/ui/card";

interface PictureCardProps {
  title: string;
  description: string;
  imageSources: string[];
}

const PictureViewer = ({
  title,
  description,
  imageSources,
}: PictureCardProps) => {
  return (
    <Card className="w-full">
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="grid grid-cols-2 gap-4">
          {imageSources.map((imageSource, index) => (
            <img
              key={index}
              src={imageSource}
              alt={`Image ${index + 1}`}
              className="rounded-lg w-full h-40 object-cover"
            />
          ))}
        </div>
      </div>
    </Card>
  );
};

export default PictureViewer;
