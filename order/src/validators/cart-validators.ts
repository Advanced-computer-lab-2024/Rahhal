

function validateQuantity(quantity:number) {
  if (quantity < 1) {
    return "Quantity should be at least 1";
  }
}


export default {
    validateQuantity,
};