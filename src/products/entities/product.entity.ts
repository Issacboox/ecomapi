import { CategoryEntity } from 'src/category/entities/category.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
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
}
