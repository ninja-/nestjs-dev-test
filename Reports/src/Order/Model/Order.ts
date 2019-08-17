import { Customer } from "./Customer";
import { Product } from "./Product";

export class Order {
  constructor(number: string, customer: Customer, products: Product[], createdAt: string) {
    this.number = number;
    this.customer = customer;
    this.products = products;
    this.createdAt = createdAt;
  }
  
  number: string; // id
  customer: Customer; // customer id
  createdAt: string; // '2019-08-07'
  products: Product[]; // [1, 2]
}
