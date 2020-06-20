import {
  Entity,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  PrimaryColumn
} from 'typeorm';
import { v4 } from 'uuid';
import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @PrimaryColumn('uuid')
  @Field(() => ID)
  id: string;

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

  @Column('bool', { default: false })
  confirmed: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  @Field()
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @Field()
  updatedAt: Date;

  @BeforeInsert()
  generateId(): void {
    this.id = v4();
  }
}
