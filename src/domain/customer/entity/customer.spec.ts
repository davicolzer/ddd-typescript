import { Address } from '../value-object/address';
import { Customer } from './customer';

describe('Customer unit tests', () => {
  it('should throw error when id is emput', () => {
    expect(() => {
      let customer = new Customer('', 'John Doe');
    }).toThrow('Id is required');
  });

  it('should throw error when name is emput', () => {
    expect(() => {
      let customer = new Customer('123', '');
    }).toThrow('Name is required');
  });

  it('should change name', () => {
    // Arrange
    const customer = new Customer('123', 'John');

    // Act
    customer.changeName('Jane');

    // Assert
    expect(customer.name).toBe('Jane');
  });
  it('should activate customer', () => {
    const customer = new Customer('123', 'John');
    customer.address = new Address('Street 1', 12, '38476-987', 'São Paulo');

    customer.activate();

    expect(customer.isActive()).toBe(true);
  });

  it('should deactivate customer', () => {
    const customer = new Customer('123', 'John');

    customer.deactivate();

    expect(customer.isActive()).toBe(false);
  });

  it('should throw error when address is undefined', () => {
    expect(() => {
      const customer = new Customer('123', 'John');
      customer.activate();
    }).toThrow('Address is mandatory to active a customer');
  });

  it('should add reward points', () => {
    const customer = new Customer('123', 'John');
    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(100);
    expect(customer.rewardPoints).toBe(100);

    customer.addRewardPoints(50);
    expect(customer.rewardPoints).toBe(150);
  });
});
