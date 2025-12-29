export class AppError extends Error {
  public statusCode: number

  constructor(message: string, statusCode = 400, name = 'AppError') {
    super(message)
    this.statusCode = statusCode;
    this.name = name;
  }
}

export class BadRequestError extends AppError {
  constructor(message: string) {
    super(message, 400, 'BadRequestError');
  }
}

export class ServerRequestError extends AppError {
  constructor() {
    super('Something is wrong with server. Try again later!', 500, 'Internal Server Error');
  }
}

export class InvalidParamError extends AppError {
  constructor (paramName: string) {
    super(`Invalid param: ${paramName}`, 422, 'InvalidParamError');
  }
}

export class MissingParamError extends AppError {
  constructor (paramName: string) {
    super(`Missing param: ${paramName}`, 417, 'MissingParamError');
  }
}

export class NotFoundError extends AppError {
  constructor (content: string) {
    super(`${content}`, 404, 'NotFoundError');
  }
}

export class UnauthenticatedError extends AppError {
  constructor(message: string) {
    super(message, 401, 'UnauthenticatedError');
  }
}