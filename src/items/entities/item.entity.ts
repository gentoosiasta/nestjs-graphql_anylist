import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'items' })
@ObjectType()
export class Item {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String)
  @Column()
  name: string;

  // @Field(() => Int)
  // @Column()
  // quantity: number;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  quantityUnits?: string;

  @ManyToOne(() => User, (user) => user.items)
  @Field(() => User)
  user: User;
}
