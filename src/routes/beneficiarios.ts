import { FastifyInstance } from "fastify";
import { z } from "zod";
import { knex } from "../database";
import { randomUUID } from "node:crypto";

export async function beneficiariosRoutes(app: FastifyInstance) {

  // Create new user
  app.post('/', async (request, reply) => {
    const createBeneficiariosBodySchema = z.object({
      email: z.string().email(),
      password: z.string(),
      role: z.enum(['admin', 'member'])
    })

    const { email, password, role } = createBeneficiariosBodySchema.parse(request.body)

    await knex('users_rede_beneficios').insert({
      id: randomUUID(),
      email: email,
      password: password,
      role: role
    })

    return reply.status(201).send('User created successfully')
  })

  // List users
  app.get('/', async () => {
    const users  = await knex('users_rede_beneficios').select("*");

    return { users }
  })

  // Get user information
  app.get("/:id", async (request, reply) => {

    const getUserParamsSchema = z.object({
      id: z.string().uuid()
    })

    const { id } = getUserParamsSchema.parse(request.params)

    const user = await knex('users_rede_beneficios')
      .where('id', id).first()
      
    return { user }  
  })

  // Create beneficirio
  app.post("/new", async (request, reply) => {
    const createBeneficiariosBodySchema = z.object({
      nome: z.string(),
      cpf: z.string(),
      status: z.enum(['S', 'N'])
    })

    const { nome, cpf, status} = createBeneficiariosBodySchema.parse(request.body)

    await knex('beneficiarios_rede_beneficios').insert({
      id: randomUUID(),
      nome: nome,
      cpf: cpf,
      status: status
    })

    return reply.status(201).send('Beneficiario created successfully')
  })

  // List beneficiarios
  app.get("/rede-beneficios", async () => {
    const beneficiarios = await knex('beneficiarios_rede_beneficios').select("*")

    return { beneficiarios }
  })

  // Get a unique beneficiario
  app.get("/rede-beneficios/:id", async (request, reply) => {
    const getBeneficiarioParamsSchema = z.object({
      id: z.string().uuid()
    })

    const { id } = getBeneficiarioParamsSchema.parse(request.params)

    const beneficiario = await knex('beneficiarios_rede_beneficios')
      .where('id', id).first()

    return { beneficiario }  
  })
}