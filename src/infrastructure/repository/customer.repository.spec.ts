import { Sequelize } from 'sequelize-typescript';
import { CustomerModel } from '../db/sequelize/model/customer.model';
import { Customer } from '../../domain/entity/customer';
import { CustomerRepository } from './customer.repository';
import { Address } from '../../domain/entity/address';

describe('Customer Repository test', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel]);

    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should create a customer', async () => {
    const customerRepository = new CustomerRepository();

    const customer = new Customer('1', 'Customer 1');

    customer.address = new Address('Rua Teste', 4, '12345678', 'Teste');

    customer.activate();

    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: '1' } });

    expect(customerModel.toJSON()).toEqual({
      id: '1',
      name: 'Customer 1',
      rewardPoints: 0,
      active: true,
      street: 'Rua Teste',
      number: 4,
      zipcode: '12345678',
      city: 'Teste',
    });
  });

  it('should update a customer', async () => {
    const customerRepository = new CustomerRepository();

    const customer = new Customer('1', 'Customer 1');
    customer.address = new Address('Rua Teste', 4, '12345678', 'Teste');

    customer.activate();

    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: '1' } });

    const foundCustomer = await customerRepository.find('1');

    expect(customerModel.toJSON()).toEqual({
      id: foundCustomer.id,
      name: foundCustomer.name,
      rewardPoints: foundCustomer.rewardPoints,
      active: foundCustomer.isActive(),
      street: foundCustomer.address.street,
      number: foundCustomer.address.number,
      zipcode: foundCustomer.address.zip,
      city: foundCustomer.address.city,
    });

    customer.changeName('Customer 2');
    customer.addRewardPoints(200);

    await customerRepository.update(customer);

    const customerModel2 = await CustomerModel.findOne({ where: { id: '1' } });
    const foundCustomer2 = await customerRepository.find('1');

    expect(customerModel2.toJSON()).toStrictEqual({
      id: foundCustomer2.id,
      name: foundCustomer2.name,
      rewardPoints: foundCustomer2.rewardPoints,
      active: foundCustomer2.isActive(),
      street: foundCustomer2.address.street,
      number: foundCustomer2.address.number,
      zipcode: foundCustomer2.address.zip,
      city: foundCustomer2.address.city,
    });
  });

  it('should find all customers', async () => {
    const customerRepository = new CustomerRepository();

    const customer1 = new Customer('1', 'Customer 1');
    customer1.address = new Address('Rua Teste', 4, '12345678', 'Teste');
    customer1.activate();

    await customerRepository.create(customer1);

    const customer2 = new Customer('2', 'Customer 2');
    customer2.address = new Address('Rua Teste', 4, '12345678', 'Teste');
    customer2.activate();

    await customerRepository.create(customer2);

    const foundCustomers = await customerRepository.findAll();

    const customers = [customer1, customer2];

    expect(customers).toStrictEqual(foundCustomers);
  });
});
