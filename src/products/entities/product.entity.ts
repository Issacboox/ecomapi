import { CategoryEntity } from 'src/category/entities/category.entity';
import { OrderDetailEntity } from 'src/orders/entities/order-detail.entity';
import { ReviewEntity } from 'src/reviews/entities/review.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'products' })
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  price: number;

  @Column()
  unit_sale:string;
  
  @Column()
  stock: number;

  @Column('simple-array')
  images: string[];

  @CreateDateColumn()
  created_at: Timestamp;

  @UpdateDateColumn()
  updated_at: Timestamp;

  @ManyToOne(() => UserEntity, (user) => user.products)
  addedById: UserEntity;

  @ManyToOne(() => CategoryEntity, (category) => category.products)
  categoryId: CategoryEntity;

  @OneToMany(() => ReviewEntity,(prod) => prod.product)
  reviews: ReviewEntity[];

  @OneToMany(() => OrderDetailEntity, (order) => order.product)
  products:OrderDetailEntity[]
}
