// Agregados
import { OrderItem } from './order_item';

export class Order {
  private _id: string;
  private _customerId: string;
  private _items: OrderItem[] = [];
  private _total: number;

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this._id = id;
    this._customerId = customerId;
    this._items = items;
    this._total = this.total();

    this.validate();
  }

  validate(): boolean {
    if (!this._id) {
      throw new Error('Id is required');
    }
    if (!this._customerId) {
      throw new Error('CostumerId is required');
    }
    if (!this._items || this._items.length <= 0) {
      throw new Error('Item are required');
    }
    if (this._items.some((item) => item.quantity <= 0)) {
      throw new Error('Item quantity must be greater than 0');
    }

    return true;
  }

  get id() {
    return this._id;
  }

  total(): number {
    return this._items.reduce((acc, item) => acc + item.price, 0);
  }
}
