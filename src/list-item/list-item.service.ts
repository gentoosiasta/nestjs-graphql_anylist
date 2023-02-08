import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationArgs, SearchArgs } from 'src/common/dtos/args';
import { List } from 'src/lists/entities/list.entity';
import { Repository } from 'typeorm';
import { CreateListItemInput } from './dto/create-list-item.input';
import { UpdateListItemInput } from './dto/update-list-item.input';
import { ListItem } from './entities/list-item.entity';

@Injectable()
export class ListItemService {
  constructor(
    @InjectRepository(ListItem)
    private readonly listItemRepository: Repository<ListItem>,
  ) {}

  async create(createListItemInput: CreateListItemInput): Promise<ListItem> {
    const { itemId, listId, ...rest } = createListItemInput;
    const newListItem = this.listItemRepository.create({
      ...rest,
      item: { id: itemId },
      list: { id: listId },
    });

    return this.listItemRepository.save(newListItem);
  }

  findAll(
    list: List,
    paginationArgs: PaginationArgs,
    searchArgs: SearchArgs,
  ): Promise<ListItem[]> {
    const { limit, offset } = paginationArgs;
    const { search } = searchArgs;

    const queryBuilder = this.listItemRepository
      .createQueryBuilder()
      .take(limit)
      .skip(offset)
      .where('"listId" = :listId', { listId: list.id });

    if (search) {
      queryBuilder.andWhere('LOWER(item.name) like :name', {
        name: `%${search.toLowerCase()}%`,
      });
    }

    return queryBuilder.getMany();
  }

  findOne(id: string): Promise<ListItem> {
    return this.listItemRepository.findOneBy({ id });
  }

  async update(
    id: string,
    updateListItemInput: UpdateListItemInput,
  ): Promise<ListItem> {
    const { listId, itemId, ...rest } = updateListItemInput;

    const queryBuilder = this.listItemRepository
      .createQueryBuilder()
      .update()
      .set(rest)
      .where('id = :id', { id });

    if (listId) queryBuilder.set({ list: { id: listId } });

    if (listId) queryBuilder.set({ item: { id: itemId } });

    await queryBuilder.execute();

    return this.findOne(id);
  }

  remove(id: string) {
    return `This action removes a #${id} listItem`;
  }

  async itemCountByList(list: List): Promise<number> {
    return this.listItemRepository.count({ where: { list: { id: list.id } } });
  }
}
