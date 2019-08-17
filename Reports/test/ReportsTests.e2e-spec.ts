import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ReportModule } from './../src/Report/ReportModule';

describe('', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [ReportModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/reports/products/date (GET)', () => {
    return request(app.getHttpServer())
      .get('/report/products/2019-08-08')
      .expect({ productName: 'Black sport shoes', quantity: 1, totalPrice: 110 });
  });

  it('/reports/customer/date (GET)', () => {
    return request(app.getHttpServer())
      .get('/report/customer/2019-08-08')
      .expect({ customerName: 'Jane Doe', totalPrice: 110 });
  });
});
