import { GenericModal } from "@/components/GenericModal";
import { useEffect, useState } from "react";
import PictureCard from "@/components/PictureCard";
import ReviewDisplay from "@/components/Ratings";
import { DEFAULTS } from "@/lib/constants";
import { Checkbox } from "@/components/ui/checkbox";
import { TNewProduct, TProduct } from "@/features/seller/utils/seller-columns";
import { createProduct, updateProduct } from "@/api-calls/products-api-calls";
import { toast } from "@/hooks/use-toast";
import { STATUS_CODES } from "@/lib/constants";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface ProductModalProps {
  productData?: TProduct;
  dialogTrigger?: React.ReactNode;
  userId?: string;
  username?: string;
  onSubmit?: (product: TProduct) => void;
  onDelete?: (id: string) => void;
}

export function ProductModal({
  productData,
  dialogTrigger,
  userId,
  username,
  onDelete,
  onSubmit,
}: ProductModalProps) {
  const isNewProduct: boolean = productData === undefined;
  const [modalProductData, setModalProductData] = useState<TProduct | undefined>(productData); // current product data present in the modal
  const [productImages, setProductImages] = useState<FileList | null>(null);

  const handleDelete = () => {
    if (modalProductData && onDelete) {
      if (modalProductData._id) {
        onDelete(modalProductData._id);
      }
    }
  };

  const handleSubmit = async () => {
    if (!modalProductData) return;

    try {
      toast({
        title: "Saving",
        description: "Saving product",
        style: {
          backgroundColor: "#3B82F6",
          color: "white",
        },
      });
      let response;
      if (isNewProduct) {
        // remove _id from new product
        const { _id, ...newProduct } = modalProductData;
        response = await createProduct(
          newProduct as TNewProduct,
          userId ?? "",
          username ?? "",
          productImages,
        );
      } else {
        response = await updateProduct(modalProductData, productImages);
      }

      if (
        response?.status === STATUS_CODES.STATUS_OK ||
        response?.status === STATUS_CODES.CREATED
      ) {
        toast({
          title: "Success",
          description: "Product saved successfully",
          style: {
            backgroundColor: "#34D399",
            color: "white",
          },
        });
        if (onSubmit) {
          onSubmit(modalProductData);
          setModalProductData(DEFAULTS.PRODUCT);
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save product",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    const init = async () => {
      if (isNewProduct) {
        setModalProductData(DEFAULTS.PRODUCT);
      }
    };
    init();
  }, []);

  // create generic modal with components based on data type of columns
  return (
    <GenericModal
      title={productData?.name ?? "New Product"}
      description="Product Details"
      dialogTrigger={dialogTrigger}
      onSubmit={handleSubmit}
      showDeleteButton={!isNewProduct}
      onDelete={handleDelete}
    >
      <div className="flex flex-col gap-4 p-4">
        <div className="flex flex-col gap-2">
          <Label>Product Name</Label>
          <Input
            value={modalProductData?.name ?? ""}
            onChange={(e) =>
              setModalProductData(
                modalProductData ? { ...modalProductData, name: e.target.value } : undefined,
              )
            }
            placeholder="Enter the name of your product"
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 p-4">
        <div className="flex flex-col gap-2">
          <Label>Price (EGP)</Label>
          <Input
            type="number"
            value={modalProductData?.price ?? ""}
            onChange={(e) =>
              setModalProductData(
                modalProductData
                  ? { ...modalProductData, price: Number(e.target.value) }
                  : undefined,
              )
            }
            placeholder="Enter the price of your product"
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 p-4">
        <div className="flex flex-col gap-2">
          <Label>Quantity</Label>
          <Input
            type="number"
            value={modalProductData?.quantity ?? ""}
            onChange={(e) =>
              setModalProductData(
                modalProductData
                  ? { ...modalProductData, quantity: Number(e.target.value) }
                  : undefined,
              )
            }
            placeholder="Enter the quantity of your product"
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 p-4">
        <div className="flex flex-col gap-2">
          <Label>Description</Label>
          <Input
            value={modalProductData?.description ?? ""}
            onChange={(e) =>
              setModalProductData(
                modalProductData ? { ...modalProductData, description: e.target.value } : undefined,
              )
            }
            placeholder="Enter a detailed description"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="archive"
          checked={modalProductData?.archived || false}
          onCheckedChange={(checked) =>
            setModalProductData(
              modalProductData ? { ...modalProductData, archived: checked as boolean } : undefined,
            )
          }
          // disabled={isNewProduct} // new products can't be archived "ask about it"
        />
        <label
          htmlFor="archive"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Archive Product
        </label>
      </div>

      <PictureCard
        title={"Product Picture"}
        description={"Uploaded Picture"}
        initialImageSources={productData?.picture ? [productData.picture] : []}
        handleFileUploadCallback={(files) => {
          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(files[files.length - 1]);
          setProductImages(dataTransfer.files);
        }}
      />
      {!isNewProduct && <ReviewDisplay reviews={modalProductData?.ratings} />}
      {!isNewProduct && (
        <a
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          href={"/seller/product/" + productData?._id}
        >
          View Product Stats
        </a>
      )}
    </GenericModal>
  );
}
