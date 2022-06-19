import 'reflect-metadata'
import { buildSchemaSync, Field, ObjectType, Query, Resolver } from 'type-graphql'

@ObjectType()
export class User {
  @Field()
  id: string

  @Field()
  name: string
}

@Resolver(() => User)
export class UserResolver {

  @Query(() => User)
  async users(): Promise<User[]> {
    return [
      { id: '1', name: 'John' },
      { id: '2', name: 'Jane' },
    ]
  }
}

export const resolvers = [
  UserResolver,
]  as const

export const schema = buildSchemaSync({
  resolvers,
  emitSchemaFile: true,
})
