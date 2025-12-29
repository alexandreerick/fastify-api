import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { UserService } from './user.service';
import { BadRequestError } from '@/http/validators/errors';
import { Cryptography } from '@/services/cryptography/Cryptography';

class UserController {
  static async registerUser(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
      name: z.string(),
      email: z.email(),
      password: z.string().min(6),
    });

    const { name, email, password } = registerBodySchema.parse(request.body);

    if (!name || !email || !password)
      throw new BadRequestError('É necessário informar todos os parâmetros!');

    const userAlreadyExists = await UserService.verifyIfUserExists(email);

    if (userAlreadyExists) throw new BadRequestError('User already exists!');

    const user = await UserService.createNewUser({
      name,
      email,
      password
    });

    return reply.send(user);
  }

  static async authenticateUser(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
      email: z.email(),
      password: z.string(),
    });

    const { email, password } = registerBodySchema.parse(request.body);

    const user = await UserService.verifyIfUserExists(email);

    if (!user) throw new BadRequestError('E-mail ou senha estão incorretos!');

    const cryptography = new Cryptography(12);

    const passwordMatch = await cryptography.verify(password, user.password);

    if (!passwordMatch) throw new BadRequestError('E-mail ou senha estão incorretos!');

    const token = await reply.jwtSign(
      {
        id: user.id,
      },
      {
        sign: {
          expiresIn: '10s',
        }
      }
    );

    const refreshToken = await reply.jwtSign(
      {
        id: user.id,
      },
      {
        sign: {
          expiresIn: '7d',
        },
      },
    );

    return reply.status(200).headers({
      'x-access-token': token,
      'x-refresh-token': refreshToken
    }).send();
  }

  static async refreshUserToken(request: FastifyRequest, reply: FastifyReply) {
    await request.jwtVerify()

    const { id } = request.user

    const token = await reply.jwtSign(
      {
        id,
      },
      {
        sign: {
          expiresIn: '10s',
        }
      }
    );

    const refreshToken = await reply.jwtSign(
      {
        id,
      },
      {
        sign: {
          expiresIn: '7d',
        },
      },
    );

    return reply.status(200).headers({
      'x-access-token': token,
      'x-refresh-token': refreshToken
    }).send();
  }

  static async getUserInformation(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.user;

    const data = await UserService.getMeInformation(id);

    return reply.send(data);
  }
}

export { UserController };
