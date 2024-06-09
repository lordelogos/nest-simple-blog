import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class TagsService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createTagDto: CreateTagDto) {
    return this.databaseService.tag.create({ data: createTagDto });
  }

  findAll() {
    return this.databaseService.tag.findMany();
  }

  findOne(id: number) {
    return this.databaseService.tag.findUnique({ where: { id } });
  }

  update(id: number, updateTagDto: UpdateTagDto) {
    return this.databaseService.tag.update({
      where: { id },
      data: updateTagDto,
    });
  }

  remove(id: number) {
    return this.databaseService.tag.delete({ where: { id } });
  }
}
