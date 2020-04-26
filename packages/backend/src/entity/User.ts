import { ObjectID, PrimaryGeneratedColumn, Column, Entity, ObjectIdColumn } from 'typeorm';
import { Field, ID, Root } from 'type-graphql';

@Entity()
export class User {
  @Field(() => ID)
  @ObjectIdColumn()
  _id!: ObjectID;

  @Field()
  @Column("text", { unique: true })
  email!: string;

  @Field()
  @Column()
  firstName!: string;

  @Field()
  @Column()
  lastName!: string;

  @Column()
  password!: string;

  @Field()
  name(@Root() user: User): string {
    return `${user.firstName} ${user.lastName}`;
  }

  constructor(email: string, firstName: string, lastName: string, password: string) {
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
  }
}
