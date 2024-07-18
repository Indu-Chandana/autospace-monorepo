import { ObjectType } from '@nestjs/graphql'

@ObjectType()
export class User {
  // @Field() -- do not need to use decorator because we added CLI plugin (nest-cli.json)
  uid: string
}
