import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Request } from 'express';
import { UserEntity } from 'src/users/entities/user.entity';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ArticleEntity } from './entities/article.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Articles')
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  @ApiCreatedResponse({ type: ArticleEntity })
  create(@Req() req: Request, @Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.create(
      createArticleDto,
      (req.user as UserEntity).id,
    );
  }

  @Get()
  @ApiQuery({ name: 'author', required: false })
  @ApiQuery({ name: 'tag', required: false })
  @ApiOkResponse({ type: ArticleEntity, isArray: true })
  findAll(@Query('author') author?: string, @Query('tag') tag?: string) {
    return this.articlesService.findAll(+author, +tag);
  }

  @Get(':id')
  @ApiOkResponse({ type: ArticleEntity })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.articlesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch(':id')
  @ApiCreatedResponse({ type: ArticleEntity })
  update(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    return this.articlesService.update(
      id,
      updateArticleDto,
      (req.user as UserEntity).id,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/soft-delete/:id')
  @ApiBearerAuth()
  @ApiOkResponse({ type: ArticleEntity })
  softDelete(@Req() req: Request, @Param('id', ParseIntPipe) id: number) {
    return this.articlesService.softDelete(id, (req.user as UserEntity).id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch('/restore/:id')
  @ApiCreatedResponse({ type: ArticleEntity })
  restore(@Req() req: Request, @Param('id', ParseIntPipe) id: number) {
    return this.articlesService.restore(id, (req.user as UserEntity).id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOkResponse({ type: ArticleEntity })
  remove(@Req() req: Request, @Param('id', ParseIntPipe) id: number) {
    return this.articlesService.remove(id, (req.user as UserEntity).id);
  }
}
