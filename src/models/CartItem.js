class CartItem {
  constructor(product, quantity) {
    this.quantity = quantity;
    this.product = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    };
    this.totalPriceItem = this.getTotalPriceItem();
  }

  getTotalPriceItem() {
    return Number(this.product.price) * this.quantity;
  }
}

export { CartItem };
