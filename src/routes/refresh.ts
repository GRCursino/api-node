import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export async function refreshRoute(app: FastifyInstance) {

  app.patch("/token/refresh", async (request: FastifyRequest, reply: FastifyReply) => {
    await request.jwtVerify({ onlyCookie: true }) 
    
    // A função acima irá validar se o mesmo está autenticado porém não pelo cabeçalho Authorization Bearer token
    // E sim pelo cookie (refreshToken) que será mandado na requisição 

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: request.user.sub
        }
      }
    )

    const refreshToken = await reply.jwtSign(
      {},
      {
        sign: {
          sub: request.user.sub,
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