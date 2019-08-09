import { Controller, Get, Param } from '@nestjs/common';

@Controller()
export class ReportController {
  @Get("/report/products/:date")
  bestSellers(@Param("date") date: string) {
    throw new Error('Not implemented yet');
  }

  @Get("/report/customer/:date")
  bestBuyers(@Param("date") date: string) {
    throw new Error('Not implemented yet');
  }
}
