import { Sequelize } from 'sequelize-typescript';
import { CustomerModel } from '../db/sequelize/model/customer.model';

import { OrderModel } from '../db/sequelize/model/order.model';
import { ProductModel } from '../db/sequelize/model/product.model';
import { OrderItemModel } from '../db/sequelize/model/order-item.model';
import { CustomerRepository } from './customer.repository';
import { Customer } from '../../domain/entity/customer';
import { Address } from '../../domain/entity/address';
import { ProductRepository } from './product.repository';
import { Product } from '../../domain/entity/product';
import { OrderItem } from '../../domain/entity/order_item';
import { Order } from '../../domain/entity/order';

describe('Customer Repository test', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ]);

    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('Should create a new order', async () => {
    const customerRepository = new CustomerRepository();
    const productRepository = new ProductRepository();
    const orderRepository = new OrderRepository();

    const customer1 = new Customer('123', 'Customer 1');
    customer1.address = new Address('Rua Teste', 4, '12345678', 'Teste');
    customer1.activate();
    await customerRepository.create(customer1);

    const product = new Product('01', 'Product 1', 100);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      '1',
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order('001', '123', [orderItem]);

    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: {
        id: order.id,
      },
      include: ['items'],
    });

    expect(orderModel.toJSON()).toEqual({
      id: '001',
      customer_id: '123',
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: '001',
        },
      ],
    });
  });
});
