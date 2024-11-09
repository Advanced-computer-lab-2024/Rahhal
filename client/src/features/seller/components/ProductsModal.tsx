import { GenericModal } from "@/components/GenericModal";
import { useEffect, useState } from "react";
import PictureCard from "@/components/PictureCard";
import ShortText from "@/components/ShortText";
import ReviewDisplay from "@/components/Ratings";
import { sampleReviews } from "@/lib/utils";
import { DEFAULTS } from "@/lib/constants";
import LongText from "@/components/LongText";
import { Checkbox } from "@/components/ui/checkbox";
import { TNewProduct, TProduct } from "@/features/seller/utils/seller-columns";
import { createProduct, updateProduct } from "@/api-calls/products-api-calls";

interface ProductModalProps {
  productData?: TProduct;
  dialogTrigger?: React.ReactNode;
  userId?: string;
  username?: string;
}

export function ProductModal({ productData, dialogTrigger, userId, username }: ProductModalProps) {
  const isNewProduct: boolean = productData === undefined;
  const [modalProductData, setModalProductData] = useState<TProduct | undefined>(productData); // current product data present in the modal

  const [productImages, setProductImages] = useState<FileList | null>(null);

  const handleSubmit = async () => {
    const { _id, ...rest } = modalProductData!;

    if (isNewProduct) {
      const newProduct: TNewProduct = rest;

      // I am sure that userId is not null when the modal open from table add button
      // otherwise it opens from an edit action and in that situation userId is not null
      // and already stored in the database and it's not needed in updates
      await createProduct(newProduct, userId!, username!, productImages);
    } else await updateProduct(modalProductData!, productImages);
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
    >
      <ShortText
        title="Name"
        type={"string"}
        initialValue={modalProductData?.name ?? ""}
        onSave={(value) =>
          setModalProductData(modalProductData ? { ...modalProductData, name: value } : undefined)
        }
        placeholder={"Enter the name of your product"}
        initialDisabled={!isNewProduct}
      />

      <ShortText
        title="Price (EGP)"
        type={"number"}
        initialValue={modalProductData?.price.toString() ?? "0"}
        onSave={(value) =>
          setModalProductData(
            modalProductData ? { ...modalProductData, price: Number(value) } : undefined,
          )
        }
        placeholder={"Enter the price of your product"}
        initialDisabled={!isNewProduct}
      />

      <ShortText
        title="Quantity"
        type={"number"}
        initialValue={modalProductData?.quantity.toString() ?? "0"}
        onSave={(value) =>
          setModalProductData(
            modalProductData ? { ...modalProductData, quantity: Number(value) } : undefined,
          )
        }
        placeholder={"Enter the quantity of your product"}
        initialDisabled={!isNewProduct}
      />

      <LongText
        title="Description"
        initialValue={modalProductData?.description ?? ""}
        onSave={(value) =>
          setModalProductData(
            modalProductData ? { ...modalProductData, description: value } : undefined,
          )
        }
        placeholder={"Enter a detailed description"}
        initialDisabled={!isNewProduct}
      />

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
      {!isNewProduct && <ReviewDisplay reviews={modalProductData?.ratings ?? sampleReviews} />}
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
