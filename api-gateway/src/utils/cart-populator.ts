import type { ICart, IProduct, PopulatedCart } from "@/utils/types";
import { productAxiosInstance } from "@/utils/axios-instances";


export async function populateCart(cart: ICart): Promise<PopulatedCart> {
    const populatedProducts = await Promise.all(
      cart.products.map(async (product) => {
        const productData = await productAxiosInstance.get<IProduct>(`/products/${product.productId}`);
        return {  productId : productData  , quantity : product.quantity  }
        //return { ...productData.data, quantity: product.quantity };
      })
    );
    
  
    return {
      _id: cart._id,
      userId: cart.userId,
      products: populatedProducts,
    };
  }