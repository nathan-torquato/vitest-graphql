import express from "express"
import { DocumentNode, print } from "graphql"
import http from "http"
import request from "supertest"
import { server } from '../src'

let cachedServer: any;

const createServer = async () => {
  const app = express();
  const httpServer = http.createServer(app);
  await server.start();
  server.applyMiddleware({ app });
  return httpServer;
};

export const sendTestRequest = async (
  query: DocumentNode,
  {
    variables = {},
    headers = {},
  }: {
    variables?: any;
    headers?: { [key: string]: string };
  } = {}
): Promise<any> => {
  const server = cachedServer ?? (await createServer());
  cachedServer = server;
  const requestBuilder = request(server).post("/graphql");

  Object.entries(headers).forEach(([key, value]) => {
    requestBuilder.set(key, value);
  });
  const { text } = await requestBuilder.send({
    variables,
    query: print(query),
  });
  return JSON.parse(text);
};