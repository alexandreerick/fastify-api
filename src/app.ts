import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import fastifyRedis from '@fastify/redis'
import { ZodError } from 'zod'
import { env } from '@/env'
import { userRoutes } from '@/http/modules/user/routes'
import { AppError } from '@/http/validators/errors'

const envToLogger = {
  development: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  },
  production: true,
  test: false,
}

export const app = fastify({
  logger: envToLogger[env.NODE_ENV] ?? true,
});

app.register(fastifyRedis, {
  url: env.REDIS_URL
});

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(userRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({
      message: error.message,
      name: error.name
    })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Here we should log to a external tool like DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
