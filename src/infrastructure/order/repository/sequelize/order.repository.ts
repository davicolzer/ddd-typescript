import { Order } from '../../../../domain/checkout/entity/order';
import { OrderRepositoryInterface } from '../../../../domain/checkout/repository/order-repository.interface';
import { OrderItemModel } from './order-item.model';
import { OrderModel } from './order.model';

export class OrderRepository implements OrderRepositoryInterface {
  async update(entity: Order): Promise<void> {
    await OrderModel.update(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        // include: [{ model: OrderItemModel }],

        where: {
          id: entity.id,
        },
      }
    );
  }

  find(id: string): Promise<Order> {
    throw new Error('Method not implemented.');
  }

  findAll(): Promise<Order[]> {
    throw new Error('Method not implemented.');
  }

  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }
}
