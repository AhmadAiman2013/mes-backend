import { char, pgTable, serial, text } from "drizzle-orm/pg-core";


export const products = pgTable('products', {
    id: serial('id').primaryKey(),
    name: char('name', {length: 254}).notNull(),
    description: text('description'),
})