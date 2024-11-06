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
  username?: string;
}

export function ProductModal({ productData, dialogTrigger, username }: ProductModalProps) {
  const isNewProduct: boolean = productData === undefined;
  const [modalProductData, setModalProductData] = useState<TProduct | undefined>(productData); // current product data present in the modal

  const [productImages, setProductImages] = useState<FileList | null>(null);

  const handleSubmit = async () => {
    const { _id, ...rest } = modalProductData!;

    if (isNewProduct) {
      const newProduct: TNewProduct = rest;

      // I am sure that userName is not null when the modal open from table add button
      // otherwise it opens from an edit action and in that situation userName is not null
      // and already stored in the database and it's not needed in updates
      await createProduct(newProduct, username!, productImages);
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
        title="Price"
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
        handleFileUploadCallback={(files) => setProductImages(files)}
      />
      {!isNewProduct && <ReviewDisplay reviews={modalProductData?.ratings ?? sampleReviews} />}
    </GenericModal>
  );
}
