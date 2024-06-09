import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ArticlesService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createArticleDto: CreateArticleDto, authorId: number) {
    const { title, content, tags } = createArticleDto;

    const data: Prisma.ArticleCreateInput = {
      title,
      content,
      author: {
        connect: { id: authorId },
      },
      tags: tags
        ? {
            connect: tags.map((tagId) => ({ id: tagId })),
          }
        : undefined,
    };

    return this.databaseService.article.create({
      data,
    });
  }

  findAll(authorId?: number, tagId?: number) {
    const where: Prisma.ArticleWhereInput = {
      ...(authorId && { authorId }),
      ...(tagId && { tags: { some: { id: tagId } } }),
      deletedAt: null,
    };

    return this.databaseService.article.findMany({
      where,
      include: {
        tags: true,
      },
    });
  }

  findOne(id: number) {
    return this.databaseService.article.findUnique({
      where: { id },
      include: {
        tags: true,
      },
    });
  }

  async update(id: number, updateArticleDto: UpdateArticleDto, userId: number) {
    const article = await this.databaseService.article.findUnique({
      where: { id },
    });

    if (!article) throw new NotFoundException();

    if (article.authorId !== userId) throw new ForbiddenException();

    const { title, tags, content } = updateArticleDto;

    const data: Prisma.ArticleUpdateInput = {
      title,
      content,
      author: userId ? { connect: { id: userId } } : undefined,
      tags: tags
        ? {
            set: tags.map((tagId) => ({
              id: tagId,
            })),
          }
        : undefined,
    };

    return this.databaseService.article.update({
      where: { id, authorId: userId },
      data,
    });
  }

  async softDelete(id: number, userId: number) {
    const article = await this.databaseService.article.findUnique({
      where: { id },
    });

    if (!article) throw new NotFoundException();

    if (article.authorId !== userId) throw new ForbiddenException();

    return this.databaseService.article.update({
      where: { id, authorId: userId },
      data: { deletedAt: new Date() },
    });
  }

  async restore(id: number, userId: number) {
    const article = await this.databaseService.article.findUnique({
      where: { id },
    });

    if (!article) throw new NotFoundException();

    if (article.authorId !== userId) throw new ForbiddenException();

    return this.databaseService.article.update({
      where: { id, authorId: userId },
      data: { deletedAt: null },
    });
  }

  async remove(id: number, userId: number) {
    const article = await this.databaseService.article.findUnique({
      where: { id },
    });

    if (!article) throw new NotFoundException();

    if (article.authorId !== userId) throw new ForbiddenException();

    return this.databaseService.article.delete({
      where: { id, authorId: userId },
    });
  }
}
