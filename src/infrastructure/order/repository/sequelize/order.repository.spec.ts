import { Sequelize } from 'sequelize-typescript';
import { Address } from '../../../../domain/customer/value-object/address';
import { Customer } from '../../../../domain/customer/entity/customer';

import { Product } from '../../../../domain/product/entity/product';
import { CustomerModel } from '../../../customer/repository/sequelize/customer.model';

import { ProductModel } from '../../../product/repository/sequelize/product.model';
import { CustomerRepository } from '../../../customer/repository/sequelize/customer.repository';

import { ProductRepository } from '../../../product/repository/sequelize/product.repository';
import { OrderRepository } from './order.repository';
import { OrderModel } from './order.model';
import { OrderItemModel } from './order-item.model';
import { OrderItem } from '../../../../domain/checkout/entity/order_item';
import { Order } from '../../../../domain/checkout/entity/order';

describe('Order repository test', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([
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

  it('should create a new order', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('123', 'Customer 1');
    const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1');
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product('123', 'Product 1', 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      '1',
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order('123', '123', [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ['items'],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: '123',
      customer_id: '123',
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: '123',
          product_id: '123',
        },
      ],
    });
  });

  it('Should be able to update a order', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('123', 'Customer 1');
    const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1');
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product('123', 'Product 1', 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      '1',
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order('123', '123', [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ['items'],
    });

    expect(orderModel.total).toBe(20);

    const itemsToUpdate = orderModel.items.map(
      (item) =>
        new OrderItem(
          item.id,
          item.name,
          item.price,
          item.product_id,
          item.quantity
        )
    );

    const product2 = new Product('456', 'Product 2', 20);
    await productRepository.create(product2);

    const orderItem2 = new OrderItem(
      '2',
      product2.name,
      product2.price,
      product2.id,
      4
    );

    const allorderItens = [...itemsToUpdate, orderItem2];

    const orderToUpdate = new Order(
      orderModel.id,
      orderModel.customer_id,
      allorderItens
    );

    await orderRepository.update(orderToUpdate);

    const result = await OrderModel.findOne({
      where: { id: order.id },
      include: ['items'],
    });

    expect(result.total).toBe(120);
  });

  it.todo('Should be able to find a order');
  it.todo('Should be able to find all orders');
});
