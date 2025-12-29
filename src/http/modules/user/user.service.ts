import { IRegisterUserParams } from '@/http/modules/user/user';
import { prisma } from '@/lib/prisma';
import { Cryptography } from '@/services/cryptography/Cryptography';

export class UserService {
  static async verifyIfUserExists(email: string) {
    const userExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return userExists;
  }

  static async createNewUser(data: IRegisterUserParams) {
    const cryptography = new Cryptography(12);

    const { email, name, password } = data;

    const passwordHash = await cryptography.encrypt(password);

    try {
      const newUser = await prisma.user.create({
        data: {
          email,
          name,
          password: passwordHash,
        },
        omit: {
          password: true,
        }
      });

      return newUser;
    } catch (error) {
      throw error;
    }
  }

  static async getMeInformation(userId: number) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      omit: {
        password: true,
      }
    });

    return user;
  }
}
