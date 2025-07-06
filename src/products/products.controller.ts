import { BadGatewayException, BadRequestException, Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { ProductCreateDTO } from './dto/product.create.dto';
import { ProductUpdateDTO } from './dto/product.update.dto';

@Controller('products')
export class ProductsController {
  constructor(@Inject('PRODUCTS-MS') private readonly productsClient: ClientProxy) { }

  @Get()
  getAll() {
    return this.productsClient.send({ cmd: 'products.findAll' }, {})
      .pipe(
        catchError(err => { throw new BadGatewayException(err) })
      );
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsClient.send({ cmd: 'products.findOne' }, { id })
      .pipe(catchError(err => { throw new BadRequestException(err) }));
  }

  @Post()
  create(@Body() dto: ProductCreateDTO) {
    return this.productsClient.send({ cmd: 'products.create' }, dto)
      .pipe(catchError(err => { throw new BadRequestException(err) }));
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ProductUpdateDTO
  ) {
    return this.productsClient.send({ cmd: 'products.update' }, { ...dto, id })
      .pipe(catchError(err => { throw new BadRequestException(err) }))
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.productsClient.send({ cmd: 'products.delete' }, { id })
      .pipe(catchError(err => { throw new BadRequestException(err) }))
  }

}
