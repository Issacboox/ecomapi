import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CategoryService } from 'src/category/category.service';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepo: Repository<ProductEntity>,
    private readonly categoryService: CategoryService,
  ) {}

  async create(
    createProductDto: CreateProductDto,
    currentUser: UserEntity,
  ): Promise<ProductEntity> {
    const category = await this.categoryService.findOne(
      +createProductDto.category,
    );
    const product = this.productRepo.create(createProductDto);
    product.categoryId = category;
    product.addedById = currentUser;
    return await this.productRepo.save(product);
  }

  async findAll(): Promise<ProductEntity[]> {
    return this.productRepo.find();
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOne({
      where: { id: id },
      relations: {
        addedById: true,
        categoryId: true,
      },
      select: {
        addedById: {
          id: true,
          username: true,
          email: true,
        },
        categoryId: {
          id: true,
          title: true,
        },
      },
    });
    if (!product){
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
