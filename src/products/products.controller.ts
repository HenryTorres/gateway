import { BadGatewayException, Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError } from 'rxjs';

@Controller('products')
export class ProductsController {
  constructor(@Inject('PRODUCTS-MS') private readonly productsClient: ClientProxy) { }

  @Get()
  getAll() {
    return this.productsClient.send({ cmd: 'findAll' }, {})
      .pipe(
        catchError(err => { throw new BadGatewayException(err) })
      );
  }

}
