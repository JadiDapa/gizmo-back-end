import { Router } from 'express';
import AccountController from '../controllers/controller.account';
import { authCheck } from '../helpers/helper.authorization';

const AccountRouter = Router();

AccountRouter.get('/accounts', authCheck, AccountController.getAllAccount);
AccountRouter.get('/accounts/:accountId', authCheck, AccountController.getAccountById);
AccountRouter.post('/accounts/login', AccountController.loginAccount);
AccountRouter.post('/accounts/create', AccountController.createAccount);
AccountRouter.put('/accounts/:accountId', authCheck, AccountController.updateAccount);
AccountRouter.delete('/accounts/:accountId', authCheck, AccountController.deleteAccount);

export default AccountRouter;
