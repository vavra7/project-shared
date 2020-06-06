import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column('citext', { unique: true })
  @Field()
  email: string;

  @Column('varchar', { length: 50 })
  @Field()
  firstName: string;

  @Column('varchar', { length: 50 })
  @Field()
  lastName: string;

  @Column('text')
  password: string;
}
