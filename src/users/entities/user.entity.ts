import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Timestamp,
  OneToMany,
} from 'typeorm';
import { Roles } from 'src/utils/common/user-role.enum';
import { CategoryEntity } from 'src/category/entities/category.entity';
import { ProductEntity } from 'src/products/entities/product.entity';
import { ReviewEntity } from 'src/reviews/entities/review.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ type: 'enum', enum: Roles, array: true, default: [Roles.USER] })
  roles: Roles[];

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Timestamp;

  @OneToMany(() => CategoryEntity, (cat) => cat.addedById)
  categories: CategoryEntity[];

  @OneToMany(() => ProductEntity, (prod) => prod.addedById)
  products: ProductEntity[];

  @OneToMany(() => ReviewEntity, (rev) => rev.user)
  reviews: ReviewEntity[];
}
