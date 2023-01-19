import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateItemInput {
  @Field(() => String)
  name: string;
  @Field(() => Float)
  quantity: number;
  @Field(() => String, { nullable: true })
  quantityUnits: string;
}
