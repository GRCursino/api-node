import { FastifyInstance } from "fastify";
import { z } from "zod"
import { knex } from "../database";

export async function loginRoutes(app: FastifyInstance) {

  app.post("/login", async (request, reply) => {
    const loginBodySchema = z.object({
      email: z.string(),
      password: z.string(),
    }) 

    const { email, password } = loginBodySchema.parse(request.body)
    
    const user =  await knex('users_rede_beneficios')
      .where('email', email)
      .andWhere('password', password)
      .first()
    
    if(!user) {
      //return reply.status(401).send('Unauthorized: invalid credentials')
      throw new Error("Invalid credentials")
    }

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.email
        }
      }
    )

    const refreshToken = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.email,
          expiresIn: '7d'
        }
      }
    )
    
    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/', // todas rotas teram acesso ao cookie
        secure: true, // garante que o front não lerá o cookie como uma informação bruta
        sameSite: true, // garante que o cookie só funcionará no mesmo domínio
        httpOnly: true, // garante que o cookie só será consumido pelo back-end (no caso, essa api)
      })
      .status(200).send({ token })
  })
}