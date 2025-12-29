import { FastifyRedis } from "@fastify/redis";

export interface IRegisterUserParams {
  email: string;
  name: string;
  password: string;
}

export interface ISaveRefreshTokenOnCacheParams {
  redisInstance: FastifyRedis;
  userId: number;
  refresh_token: string;
}

export interface IGetRefreshTokenOnCacheParams {
  redisInstance: FastifyRedis;
  userId: number;
}
