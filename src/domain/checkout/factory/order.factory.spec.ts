import { OrderFactory } from './order.factory';

describe('Order factory unit tests', () => {
  it('Should create an order', () => {
    const orderProps = {
      id: crypto.randomUUID(),
      customerId: crypto.randomUUID(),
      items: [
        {
          id: crypto.randomUUID(),
          name: 'Product 1',
          productId: crypto.randomUUID(),
          quantity: 1,
          price: 10,
        },
      ],
    };

    const order = OrderFactory.create(orderProps);
    expect(order.id).toBe(orderProps.id);
    expect(order.customerId).toBe(orderProps.customerId);
    expect(order.items.length).toBe(1);
  });
});
