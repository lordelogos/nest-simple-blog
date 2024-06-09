import { ApiProperty } from '@nestjs/swagger';
import { Tag } from '@prisma/client';

export class TagEntity implements Tag {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}
