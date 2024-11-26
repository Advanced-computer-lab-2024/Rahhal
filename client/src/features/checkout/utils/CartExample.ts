export const CartExample = {
  _id: '5f0b0e7b6f6b6b001f6f3b3d',
  userId: '67433c21ae0c15329a432cc4',
  products: [
    {
      product: {
        _id: '6730d3d65f3b0ac5f0d209f1',
        name: 'Hoodie Seller',
        picture: 'https://firebasestorage.googleapis.com/v0/b/rahhal-569d6.firebasestorage.app/o/products%2F6740c4795969e92342a1a1ba%2F6740c5579c71a86ca80ed233%2Frahhal%20hoodie.jpeg?alt=media&token=ccb24ddc-faf7-4128-9487-50cd36e8a93c',
        price: 200,
        seller: 'Rahhal'
      },
      quantity: 3
    },
    {
      product: {
        _id: '6730d4085f3b0ac5f0d209f8',
        name: 'Hoodie Rahhal',
        picture: 'https://firebasestorage.googleapis.com/v0/b/rahhal-569d6.firebasestorage.app/o/products%2F6740c4795969e92342a1a1ba%2F6740c5f39c71a86ca80ed237%2Frahhal%20bottle.jpeg?alt=media&token=9a959be4-efa8-42c4-901a-5b99c73cf07c',
        price: 100,
        seller : 'Batee5a'
      },
      quantity: 2
    }
  ]
};

export interface IItem {
  name: string;
  price: number;
  quantity: number;
  seller: string;
  picture: string; // this will be needed if we want to display the item picture in the order history
  productId: string;
}


interface PromoCode {

  type: 'percentage' | 'fixed' | 'shipping';

  value: number;

  description: string;

}
export const PROMO_CODES: { [key: string]: PromoCode } = {
  'WELCOME10': {
    type: 'percentage',
    value: 10,
    description: '10% off your order'
  },
  'FREESHIP': {
    type: 'shipping',
    value: 0,
    description: 'Free shipping on your order'
  },
  'SAVE50': {
    type: 'fixed',
    value: 50,
    description: '£50 off your order'
  },
};
