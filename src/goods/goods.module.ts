import { Module } from '@nestjs/common';
import { GoodsResolver } from './goods.resolver';
import { GoodsService } from './goods.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Goods } from './goods.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Goods])],
  providers: [GoodsResolver, GoodsService]
})
export class GoodsModule { }
