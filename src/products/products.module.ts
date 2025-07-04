import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { environmentVars } from 'src/config/envs';

@Module({
  controllers: [ProductsController],
  providers: [],
  imports: [
    ClientsModule.register([
      {
        name: 'PRODUCTS-MS',
        transport: Transport.TCP,
        options: {
          host: environmentVars.PRODUCTS_MS_HOST,
          port: environmentVars.PRODUCTS_MS_PORT
        }
      }
    ])
  ]
})
export class ProductsModule { }
