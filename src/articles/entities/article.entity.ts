import { ApiProperty } from '@nestjs/swagger';
import { Article } from '@prisma/client';
import { TagEntity } from 'src/tags/entities/tag.entity';

export class ArticleEntity implements Article {
  @ApiProperty()
  authorId: number;

  @ApiProperty()
  content: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  deletedAt: Date | null;

  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  tags: Array<TagEntity>;
}
