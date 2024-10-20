import { Product } from '../entity/product';
import { ProductB } from '../entity/product-b';
import { ProductInterface } from '../entity/product.interface';

export class ProductFactory {
  private static OptionFactories = {
    a: (name: string, price: number) =>
      new Product(crypto.randomUUID(), name, price),
    b: (name: string, price: number) =>
      new ProductB(crypto.randomUUID(), name, price),
  };

  static create(
    type: keyof typeof this.OptionFactories,
    name: string,
    price: number
  ): ProductInterface {
    const option = this.OptionFactories[type];

    if (!option) {
      throw new Error(`Product type ${type} not supported`);
    }

    return this.OptionFactories[type](name, price);
  }
}
