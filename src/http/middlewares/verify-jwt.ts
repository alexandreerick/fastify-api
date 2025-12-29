import { FastifyReply, FastifyRequest } from 'fastify'
import { UnauthenticatedError } from '@/http/validators/errors';

export async function verifyJwt(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify()
  } catch (err) {
    throw new UnauthenticatedError('Token inválido ou expirado!');
  }
}
