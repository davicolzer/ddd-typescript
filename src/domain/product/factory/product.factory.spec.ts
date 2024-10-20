import { ProductFactory } from './product.factory';

describe('Product factory unit test', () => {
  it('Should create a product type a', () => {
    const product = ProductFactory.create('a', 'Product A', 10);
    expect(product.id).toBeDefined();
    expect(product.name).toBe('Product A');
    expect(product.price).toBe(10);
    expect(product.constructor.name).toBe('Product');
  });

  it('Should create a product type b', () => {
    const product = ProductFactory.create('b', 'Product B', 10);
    expect(product.id).toBeDefined();
    expect(product.name).toBe('Product B');
    expect(product.price).toBe(20);
    expect(product.constructor.name).toBe('ProductB');
  });

  it('Unknown type should throw an error', () => {
    expect(() => {
      //@ts-ignore
      ProductFactory.create('c', 'Product C', 10);
    }).toThrow('Product type c not supported');
  });
});
