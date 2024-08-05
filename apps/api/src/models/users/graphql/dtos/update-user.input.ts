
import { InputType, PartialType } from '@nestjs/graphql'
import { User } from '../entity/user.entity'

@InputType()
export class UpdateUserInput extends PartialType(User) {
  uid: User['uid'] //uid depend on prisma schema. when we change it in prisma schema we do not qant to update in there.
}
