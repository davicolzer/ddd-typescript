import { Order } from './order';
import { OrderItem } from './order_item';

describe('Order unit tests', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      const order = new Order('', '123', []);
    }).toThrow('Id is required');
  });

  it('should throw error when costumerId is empty', () => {
    expect(() => {
      const order = new Order('123', '', []);
    }).toThrow('CostumerId is required');
  });

  it('should throw error when itens is empty', () => {
    expect(() => {
      const order = new Order('123', '321', []);
    }).toThrow('Item are required');
  });

  it('should calculate total', () => {
    const item1 = new OrderItem('i1', 'Item 1', 10, 'p1', 2);
    const item2 = new OrderItem('i2', 'Item 2', 20, 'p2', 2);

    const order1 = new Order('123', '321', [item1]);
    expect(order1.total()).toBe(20);

    const order2 = new Order('123', '321', [item1, item2]);
    expect(order2.total()).toBe(60);
  });
  it('should thorw error if the item qtd is less or equal zero', () => {
    expect(() => {
      const item = new OrderItem('i1', 'Item 1', 10, 'p1', 0);

      const order = new Order('123', '321', [item]);
    }).toThrow('Item quantity must be greater than 0');
  });
});
