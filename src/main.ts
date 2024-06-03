import { Address } from './entity/address';
import { Customer } from './entity/customer';
import { Order } from './entity/order';
import { OrderItem } from './entity/order_item';

let customer = new Customer('123', 'John');
const address = new Address('Street', 12, '123', 'City');

customer.address = address;
customer.activate();

const item1 = new OrderItem('1', 'Item 1', 10, 'p1', 2);
const item2 = new OrderItem('2', 'Item 2', 15, 'p2', 2);
const order = new Order('01', '123', [item1, item2]);
