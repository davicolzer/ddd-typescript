import { Address } from '../value-object/address';
import { CustomerFactory } from './customer.factory';

describe('Customer factory unit tests', () => {
  it('Should create a customer', () => {
    let customer = CustomerFactory.create('John');
    expect(customer.id).toBeDefined();
    expect(customer.name).toBe('John');
    expect(customer.rewardPoints).toBe(0);
  });

  it('Should create a customer with an address', () => {
    const address = new Address('Street 1', 1, '12345678', 'São Paulo');
    let customer = CustomerFactory.createWithAddress('John', address);
    expect(customer.id).toBeDefined();
    expect(customer.name).toBe('John');
    expect(customer.address).toEqual(address);
  });
});
