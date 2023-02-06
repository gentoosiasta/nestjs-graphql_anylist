import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Item } from 'src/items/entities/item.entity';
import { List } from 'src/lists/entities/list.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('listItems')
@ObjectType()
export class ListItem {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({ type: 'numeric' })
  @Field(() => Number)
  quantity: number;

  @Column('boolean')
  @Field(() => Boolean)
  completed: boolean;

  // list: List;

  // item: Item;
}
