import { FastifyInstance } from 'fastify'

import { verifyJwt } from '@/http/middlewares/verify-jwt'

import { UserController } from '@/http/modules/user/user.controller'

export async function userRoutes(app: FastifyInstance) {
  app.post('/signup', UserController.registerUser);
  app.post('/signin', UserController.authenticateUser);

  app.patch('/token/refresh', UserController.refreshUserToken)

  app.get('/me', { onRequest: [verifyJwt] }, UserController.getUserInformation);
}
