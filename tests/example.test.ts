import { gql } from "apollo-server-express";
import { sendTestRequest } from "./sendTestRequest";

it("Example", async () => {
  const response = await sendTestRequest(gql`
    query {
      users {
        id
        name
      }
    }
  `);

  expect(response).toEqual({
    data: {
      users: [
        { id: "1", name: "John" },
        { id: "2", name: "Jane" },
      ]
    },
  });
});
