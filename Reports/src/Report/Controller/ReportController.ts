import { Controller, Get, Param, Inject } from '@nestjs/common';
import { OrderMapper } from '../../Order/Service/OrderMapper';
import { IBestBuyers, IBestSellers } from '../Model/IReports';
import { Product } from 'src/Order/Model/Product';

@Controller()
export class ReportController {
  @Inject()
  private mapper: OrderMapper;

  @Get("/report/products/:date")
  async bestSellers(@Param("date") date: string): Promise<IBestSellers> {
    // Uh...that's a lot of "functional" coding here ;-)
    // But that's the style that most Nest apps follow these days, so...
    // ¯\_(ツ)_/¯

    let orders = (await this.mapper.fetchOrders());
    date && (orders = orders.filter(o => o.createdAt == date));

    let allSold = [].concat(...orders.map(o => o.products)) as Product[]; // flat array

    if (!allSold.length) {
      return null;
    }

    let rank = new Map();
    allSold.forEach(p => rank.has(p.id) ? rank.set(p.id, rank.get(p.id) + 1) : rank.set(p.id, 1));

    // Sort rank from highest to lowest
    rank = new Map([...rank.entries()].sort((a: any, b: any) => b[0] - a[0] ));

    console.log(rank);

    let winnerId = rank.values().next().value;
    let winner = allSold.find(p => p.id == winnerId);
    let winnerName = winner.name;
    let winnersSold = allSold.filter(p => p.id == winnerId);

    let winnerCount = winnersSold.length;
    let winnerTotalPrice = winnersSold.reduce((a, b) => a + b.price, 0);

    return {
      productName: winnerName,
      quantity: winnerCount,
      totalPrice: winnerTotalPrice
    }
  }

  @Get("/report/customer/:date")
  async bestBuyers(@Param("date") date: string): Promise<IBestBuyers> {
    let orders = (await this.mapper.fetchOrders());
    date && (orders = orders.filter(o => o.createdAt == date));

    let customerData = new Map();
    let recordMoney = -1, recordCustomer;

    for (let order of orders) {
      let value = order.products.map(p => p.price).reduce((a, b) => a + b, 0);
      let customerKey = `${order.customer.firstName} ${order.customer.lastName}`;
      let data = customerData.get(customerKey) || 0;

      value += data;

      customerData.set(customerKey, value);

      if (value > recordMoney) {
        recordCustomer = customerKey;
        recordMoney = value;
      }
    }

    return {
      customerName: recordCustomer,
      totalPrice: recordMoney
    }
  }
}
