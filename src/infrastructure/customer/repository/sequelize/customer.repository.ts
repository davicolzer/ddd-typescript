import { Address } from '../../../../domain/customer/value-object/address';
import { Customer } from '../../../../domain/customer/entity/customer';
import { CustomerRepositoryInterface } from '../../../../domain/customer/repository/customer-repository.interface';
import { CustomerModel } from './customer.model';

export class CustomerRepository implements CustomerRepositoryInterface {
  async create(entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      street: entity.address.street,
      number: entity.address.number,
      zipcode: entity.address.zip,
      city: entity.address.city,
      active: entity.isActive(),
      rewardPoints: entity.rewardPoints,
    });
  }

  async update(entity: Customer): Promise<void> {
    await CustomerModel.update(
      {
        name: entity.name,
        street: entity.address.street,
        number: entity.address.number,
        zipcode: entity.address.zip,
        city: entity.address.city,
        active: entity.isActive(),
        rewardPoints: entity.rewardPoints,
      },
      {
        where: {
          id: entity.id,
        },
      }
    );
  }

  async find(id: string): Promise<Customer> {
    const customerModel = await CustomerModel.findOne({ where: { id } }).catch(
      () => {
        throw new Error('Customer not found');
      }
    );

    const customer = new Customer(customerModel.id, customerModel.name);

    customer.address = new Address(
      customerModel.street,
      customerModel.number,
      customerModel.zipcode,
      customerModel.city
    );

    customer.addRewardPoints(customerModel.rewardPoints);
    if (customerModel.active) {
      customer.activate();
    }

    return customer;
  }

  async findAll(): Promise<Customer[]> {
    const customerModels = await CustomerModel.findAll();
    return customerModels.map((customerModel) => {
      const customer = new Customer(customerModel.id, customerModel.name);

      customer.address = new Address(
        customerModel.street,
        customerModel.number,
        customerModel.zipcode,
        customerModel.city
      );

      customer.addRewardPoints(customerModel.rewardPoints);

      if (customerModel.active) {
        customer.activate();
      }

      return customer;
    });
  }
}
