import { CreateUserInput } from './create-user.input'
import { InputType, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  // @Field() -- do not need to use decorator because we added CLI plugin (nest-cli.json)
  uid: string
}
