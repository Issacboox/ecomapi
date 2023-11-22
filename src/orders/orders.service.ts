import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { Repository } from 'typeorm';
import { OrderDetailEntity } from './entities/order-detail.entity';
import { ShippingEntity } from './entities/shipping.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepo: Repository<OrderEntity>,
    @InjectRepository(OrderDetailEntity)
    private readonly orderDetailRepository: Repository<OrderDetailEntity>,
  ) {}

  async create(createOrderDto: CreateOrderDto, currentUser: UserEntity) {
    const shippingEntity = new ShippingEntity();
    Object.assign(shippingEntity, createOrderDto.shippingAddress);

    const orderEntity = new OrderEntity();
    orderEntity.shippingsAddress = shippingEntity;
    orderEntity.user = currentUser;

    const order = await this.orderRepo.save(orderEntity);

    let opEntity:{
      orderId:number,
      productId:number,
      product_quantity:number,
      product_unit_price:number
    }[]=[];

    for(let i=0;i< createOrderDto.orderedProduct.length; i++){
      const orderId = order.id
      const productId = createOrderDto.orderedProduct[i].id
      const product_quantity = createOrderDto.orderedProduct[i].product_quantity
      const product_unit_price = createOrderDto.orderedProduct[i].product_unit_price

      opEntity.push({orderId,productId,product_quantity,product_unit_price})
    }

    const op = await this.orderDetailRepository.createQueryBuilder()
    .insert()
    .into(OrderDetailEntity)
    .values(opEntity)
    .execute();

    return await this.findOne(order.id);
  }

  findAll() {
    return `This action returns all orders`;
  }

  async findOne(id: number) {
    return await this.orderRepo.findOne({
      where:{id},
      relations:{
        shippingsAddress:true,
        user:true,
        products:{product:true}
      }
    });

  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
