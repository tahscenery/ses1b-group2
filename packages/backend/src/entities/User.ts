import { ObjectID, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Field, ID, Root } from 'type-graphql';

export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  _id!: ObjectID;

  @Field()
  @Column()
  firstName!: string;

  @Field()
  @Column()
  lastName!: string;

  @Field()
  name(@Root() user: User): string {
    return `${user.firstName} ${user.lastName}`;
  }

  @Field()
  @Column("text", { unique: true })
  email!: string;

  @Column()
  password!: string;
}
