import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { File, FileBadge, FileImage, Scale } from "lucide-react";
import NoFiles from "@/assets/no-files.png";

function FileComponent({ url }: { url: string }) {
  // Decode URL to make sure encoded characters are readable
  const decodedUrl = decodeURIComponent(url);
  const lastSegment = decodedUrl.split("/").pop();
  const [fileName, fileExtension] = lastSegment
    ? lastSegment.split("?")[0].split(".")
    : ["", ""];

  return (
    <div className="group relative rounded-md border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-gray-300 ">
      <a href={url} className="absolute inset-0 z-10" target="_blank" />
      <div className="flex h-20 w-full items-center justify-center">
        {fileExtension === "jpeg" || fileExtension === "png" ? (
          <FileImage className="h-12 w-12 text-muted-foreground group-hover:text-primary" />
        ) : (
          <File className="h-12 w-12 text-muted-foreground group-hover:text-primary" />
        )}
      </div>
      <div className="mt-4 text-center">
        <h3 className="text-sm font-medium truncate">{fileName}</h3>
      </div>
    </div>
  );
}

export default function UserDocuments({
  certificatesUrls = [],
  governmentalDocumentsUrls = [],
}: {
  certificatesUrls?: string[];
  governmentalDocumentsUrls?: string[];
}) {
  return (
    <Tabs defaultValue="governmental-documents" className="w-full">
      <TabsList className="grid w-full sm:grid-cols-2 grid-col-1 mb-10">
        <TabsTrigger value="governmental-documents">
          <Scale className="h-5 w-5 mr-2" />
          Governmental Documents
        </TabsTrigger>
        <TabsTrigger value="certificates">
          <FileBadge className="h-5 w-5 mr-2" />
          Certificates
        </TabsTrigger>
      </TabsList>
      <TabsContent value="governmental-documents">
        {governmentalDocumentsUrls?.length > 0 ? (
          <div className="flex-1 overflow-auto pt-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {governmentalDocumentsUrls.map((url) => (
                <FileComponent url={url} />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <img
              src={NoFiles}
              className="h-4/5 w-4/5 rounded-md object-cover"
            />
          </div>
        )}
      </TabsContent>
      <TabsContent value="certificates">
        {certificatesUrls?.length > 0 ? (
          <div className="flex-1 overflow-auto pt-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {certificatesUrls.map((url) => (
                <FileComponent url={url} />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <img
              src={NoFiles}
              className="h-4/5 w-4/5 rounded-md object-cover"
            />
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}
