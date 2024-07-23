import { InputType } from '@nestjs/graphql'

@InputType()
export class CreateUserInput {
  // @Field() -- do not need to use decorator because we added CLI plugin (nest-cli.json)
  uid: string
}
