import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CurrentUser } from 'src/utils/decorators/current-user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { AuthenticationGuard } from 'src/utils/guards/authentication.guard';
import { AuthorizeGuard } from 'src/utils/guards/authorization.guard';
import { AuthorizeRoles } from 'src/utils/decorators/authorize-roles.decorator';
import { Roles } from 'src/utils/common/user-role.enum';
import { CategoryEntity } from './entities/category.entity';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @AuthorizeRoles(Roles.ADMIN)
  @UseGuards(AuthenticationGuard,AuthorizeGuard)
  @Post('add-category')
  async create(@Body() createCategoryDto: CreateCategoryDto,@CurrentUser() currentUser: UserEntity
  ):Promise<CategoryEntity> {
    return await this.categoryService.create(createCategoryDto, currentUser);
  }

  @Get()
  async findAll() {
    return await this.categoryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string):Promise<CategoryEntity> {
    return await this.categoryService.findOne(+id);
  }

  @AuthorizeRoles(Roles.ADMIN)
  @UseGuards(AuthenticationGuard,AuthorizeGuard)
  @Patch('update/:id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ):Promise<CategoryEntity> {
    return await this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
