import { PrismaClient, Accounts } from '@prisma/client';
const prisma = new PrismaClient();
import bcrypt from 'bcryptjs';

class AccountModel {
  async getAll() {
    const account = await prisma.accounts.findMany();
    return account;
  }

  async getById(accountId: string) {
    const account = await prisma.accounts.findUnique({
      where: {
        id: parseInt(accountId)
      }
    });
    return account;
  }

  async getByUsername(data: Accounts) {
    const account = await prisma.accounts.findUnique({
      where: {
        username: data.username.toLowerCase()
      }
    });

    return account;
  }

  async create(data: Accounts) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const account = await prisma.accounts.create({
      data: { username: data.username.toLowerCase(), password: hashedPassword }
    });
    return account;
  }

  async update(accountId: string, data: Accounts) {
    const account = await prisma.accounts.update({
      where: {
        id: parseInt(accountId)
      },
      data: data
    });
    return account;
  }

  async delete(accountId: string) {
    const account = await prisma.accounts.delete({
      where: {
        id: parseInt(accountId)
      }
    });
    return account;
  }
}

export default AccountModel;
