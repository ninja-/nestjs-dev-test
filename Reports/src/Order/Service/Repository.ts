import { Injectable } from '@nestjs/common';

/**
 * Data access layer
 */
@Injectable()
export class Repository {
  fetchOrders() {
    return require('../Resources/Data/orders.json');
  }

  fetchProducts() {
    return require('../Resources/Data/products.json');
  }

  fetchCustomers() {
    return require('../Resources/Data/customers.json');
  }
}
