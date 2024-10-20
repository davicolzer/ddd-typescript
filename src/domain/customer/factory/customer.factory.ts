import { Customer } from '../entity/customer';
import { Address } from '../value-object/address';

export class CustomerFactory {
  static create(name: string): Customer {
    return new Customer(crypto.randomUUID(), name);
  }
  static createWithAddress(name: string, address: Address): Customer {
    const customer = new Customer(crypto.randomUUID(), name);
    customer.address = address;
    return customer;
  }
}
