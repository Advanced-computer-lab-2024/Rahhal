import { GenericModal } from "@/components/GenericModal";
import { useEffect, useState } from "react";
import PictureCard from "@/components/PictureCard";
import ShortText from "@/components/ShortText";
import ReviewDisplay from "@/components/non-tourist/Ratings";
import { IMAGES, sampleReviews } from "@/lib/utils";
import { DEFAULTS } from "@/lib/constants";
import LongText from "@/components/LongText";
import { TNewProduct, TProduct } from "@/table-columns/seller-columns";
import { createProduct, updateProduct } from "@/api-calls/products-api-calls";

interface ProductModalProps {
  productData?: TProduct;
  dialogTrigger?: React.ReactNode;
  userId?: string;
}

export function ProductModal({ productData, dialogTrigger, userId }: ProductModalProps) {
  const isNewProduct: boolean = productData === undefined;
  const [modalProductData, setModalProductData] = useState<TProduct | undefined>(productData); // current product data present in the modal

  const handleSubmit = async () => {
    console.log(modalProductData);
    console.log(isNewProduct);
    if (isNewProduct) {
      const { _id, ...rest } = modalProductData!;
      const newProduct: TNewProduct = rest;

      // I am sure that userId is not null when the modal open from table add button
      // otherwise it opens from an edit action and in that situation userId is not null
      // and already stored in the database and it's not needed in updates
      await createProduct(newProduct, userId!);
    } else await updateProduct(modalProductData!);
    window.location.reload();
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

      <PictureCard
        title={"Product Picture"}
        description={"Uploaded Picture"}
        // modalProductData?.picture??
        imageSources={IMAGES}
      />
      {!isNewProduct && <ReviewDisplay reviews={sampleReviews} />}
    </GenericModal>
  );
}
