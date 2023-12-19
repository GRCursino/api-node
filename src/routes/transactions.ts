import { FastifyInstance } from "fastify"
import { z } from "zod"
import { randomUUID } from "node:crypto"
import { knex } from "../database"

export async function transactionsRoutes(app: FastifyInstance) {

  //  Create a new transaction

  app.post('/', async (request, reply) => {
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit'])
    })

    const { amount, title, type } = createTransactionBodySchema.parse(request.body)

    await knex('transactions').insert({
      id: randomUUID(),
      title: title,
      amount: type === 'credit' ? amount : amount * -1
    })

    return reply.status(201).send('Transaction created successfully')
  })

  // List transactions

  app.get('/', async () => {
    const transactions = await knex('transactions').select()

    return { transactions } 
  })

  // Get a unique transaction

  app.get('/:id', async (request, reply) => {
    const getTransactionParamsSchema = z.object({
      id: z.string().uuid()
    })

    const { id } = getTransactionParamsSchema.parse(request.params) 

    const transaction = await knex('transactions')
      .where('id', id).first() // evita que o dado venha num array, caso seja um dado único.
      
    return { transaction }
  })

  // Get summary

  app.get('/summary', async () => {
    const summary = await knex('transactions')
      .sum('amount', { as: 'amount' }).first()

    return { summary }
  })
}