import { Injectable, Inject } from '@nestjs/common';
import { Repository } from './Repository';
import { Order } from '../Model/Order';
import { Customer } from '../Model/Customer';
import { Product } from '../Model/Product';

@Injectable()
export class OrderMapper {
  @Inject() repository: Repository;

  async fetchOrders(): Promise<Order[]> {
    // Doing this a simple way.
    // I don't think I am missing any NestJS "magic" here - there's some mapping functionality, but for real database ORM...
    
    let customers = await this.repository.fetchCustomers();
    let orders = await this.repository.fetchOrders();
    let products = await this.repository.fetchProducts();
    
    let customerMap = new Map(customers.map(o => [o.id, o]));
    let productsMap = new Map(products.map(p => [p.id, p]));

    let orderMap = 
      orders.map(order => new Order(order.number, customerMap.get(order.customer), order.products.map(p => productsMap.get(p)), order.createdAt));
    
      return orderMap;
  }

  async fetchCustomers(): Promise<Customer[]> {
    return (await this.repository.fetchCustomers()) as Customer[];
  }

  async fetchProducts(): Promise<Product[]> {
    return (await this.repository.fetchProducts()) as Product[];
  }
}
