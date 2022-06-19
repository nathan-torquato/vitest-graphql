import { ApolloServer } from 'apollo-server-express'
import 'reflect-metadata'
import { buildSchemaSync, Field, ObjectType, Query, Resolver } from 'type-graphql'

@ObjectType()
export class User {
  @Field(() => String)
  id: string

  @Field(() => String)
  name: string
}

@Resolver(() => User)
export class UserResolver {

  @Query(() => [User])
  async users(): Promise<User[]> {
    return [
      { id: '1', name: 'John' },
      { id: '2', name: 'Jane' },
    ]
  }
}

export const resolvers = [
  UserResolver,
] as const

export const schema = buildSchemaSync({
  resolvers,
  emitSchemaFile: true,
})

export const server = new ApolloServer({
  schema,
  context: ({ req, res }) => ({ req, res, data: 1 }),
})
