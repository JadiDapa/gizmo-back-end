import AccountModel from '../models/model.account';
import ErrorResponse from '../helpers/helper.error';
import SuccessResponse from '../helpers/helper.success';
import { Accounts } from '@prisma/client';
import Validation from '../helpers/helper.validation';
import bcrypt from 'bcryptjs';
import { generateToken } from '../helpers/helper.authorization';

const account = new AccountModel();

class AccountController {
  static async getAllAccount(req: any, res: any) {
    try {
      const result = await account.getAll();
      return SuccessResponse.DataFound(req, res, 'Account found', result);
    } catch (error) {
      return ErrorResponse.InternalServer(req, res, (error as Error).message);
    }
  }

  static async getAccountById(req: { params: { accountId: string } }, res: any) {
    try {
      const accountId = req.params.accountId;
      const result = await account.getById(accountId);
      return SuccessResponse.DataFound(req, res, 'A Account found', result);
    } catch (error) {
      return ErrorResponse.InternalServer(req, res, (error as Error).message);
    }
  }

  static async loginAccount(req: { body: Accounts }, res: any) {
    try {
      const data = req.body;

      const { error } = await Validation.createAccount(data);
      if (error) {
        return ErrorResponse.Unauthorized(req, res, error.details[0].message);
      }

      const result = await account.getByUsername(data);

      if (!result) {
        return ErrorResponse.Unauthorized(req, res, 'Invalid username or password');
      }

      const comparePassword = await bcrypt.compare(data.password, result.password);

      if (!comparePassword) {
        return ErrorResponse.Unauthorized(req, res, 'Invalid username or password');
      }

      const token = generateToken({ id: result.id });

      return SuccessResponse.DataFound(req, res, 'Login Successfull', token);
    } catch (error) {
      return ErrorResponse.InternalServer(req, res, (error as Error).message);
    }
  }

  static async createAccount(req: { body: Accounts }, res: any) {
    try {
      const data = req.body;
      const { error } = await Validation.createAccount(data);
      if (error) {
        return ErrorResponse.BadRequest(req, res, error.details[0].message);
      }
      const result = await account.create(data);
      return SuccessResponse.DataFound(req, res, 'New Account Created', result);
    } catch (error) {
      return ErrorResponse.InternalServer(req, res, (error as Error).message);
    }
  }

  static async updateAccount(req: { params: { accountId: string }; body: Accounts }, res: any) {
    try {
      const accountId = req.params.accountId;
      const data = req.body;
      await Validation.createAccount(data);
      const result = await account.update(accountId, data);
      return SuccessResponse.DataFound(req, res, 'Existing Account Updated', result);
    } catch (error) {
      return ErrorResponse.InternalServer(req, res, (error as Error).message);
    }
  }

  static async deleteAccount(req: { params: { accountId: string } }, res: any) {
    try {
      const accountId = req.params.accountId;
      const result = await account.getById(accountId);
      return SuccessResponse.DataFound(req, res, 'Account Deleted', result);
    } catch (error) {
      return ErrorResponse.InternalServer(req, res, (error as Error).message);
    }
  }
}

export default AccountController;
