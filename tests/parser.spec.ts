import { gql } from "apollo-server-express";
import { print } from 'graphql'

it("print", async () => {
  expect(print(userDocumentQuery)).toBe(userStringQuery)
});

const userDocumentQuery = gql`
  query {
    users {
      id
      name
    }
  }
`

const userStringQuery = `{
  users {
    id
    name
  }
}
`