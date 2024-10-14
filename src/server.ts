import 'dotenv/config';
import { createYoga } from "graphql-yoga"
import express from 'express'

import { buildSchema } from "drizzle-graphql"
import { drizzle } from 'drizzle-orm/postgres-js'
import client from './db/index'
import * as dbSchema from './db/schema'

const db = drizzle(client, {schema: dbSchema})
const { schema } = buildSchema(db)
const PORT = process.env.PORT

const app = express()

const yoga = createYoga({schema})

app.use("/graphql", yoga)

app.listen(PORT, () => {
  console.log(`server is running at port ${PORT}`)
})