import postgres from 'postgres'

const client = postgres(process.env.DATABASE_URL || '', {prepare: false})

export default client