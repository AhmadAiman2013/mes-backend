import { ApolloServer } from "@apollo/server"
import { expressMiddleware } from "@apollo/server/express4"
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import cors  from 'cors'
import express from 'express'
import http from 'http'

import { buildSchema } from "drizzle-graphql"
import { drizzle } from 'drizzle-orm/postgres-js'
import client from './db/index'
import * as dbSchema from './db/schema'

const db = drizzle(client, {schema: dbSchema})
const { schema } = buildSchema(db)

const app = express()

const httpServer = http.createServer(app)

const server = new ApolloServer({ schema, plugins: [ApolloServerPluginDrainHttpServer({ httpServer})] });

await server.start()

app.use(
    '/products',
    cors<cors.CorsRequest>(),
  express.json(),
  expressMiddleware(server)
)

await new Promise<void>(resolve => httpServer.listen({ port: 4000}, resolve))
console.log(`🚀 Server ready at http://localhost:4000/`);