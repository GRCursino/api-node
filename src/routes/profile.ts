import { FastifyInstance } from "fastify";
import { verifyJWT } from "../middlewares/verify-jwt";

export async function profileRoutes(app: FastifyInstance) {

  app.get("/me", {onRequest: [verifyJWT]}, async(request, reply) => {
   
    console.log(request.user)

    return reply.send("Passou")
  })
}