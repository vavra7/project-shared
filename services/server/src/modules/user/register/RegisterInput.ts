import { IsEmail, Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { IsEmailUnique } from './IsEmailUniqueValidation';

@InputType()
export class RegisterInput {
  @Field()
  @IsEmail()
  @IsEmailUnique({ message: 'Email already in use.' })
  email: string;

  @Field()
  @Length(2, 50)
  firstName: string;

  @Field()
  @Length(2, 50)
  lastName: string;

  @Field()
  password: string;
}
