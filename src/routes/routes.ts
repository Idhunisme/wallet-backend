import express, { Router } from 'express';
import { NftController } from '../controllers/NftController';
import { DappsController } from '../controllers/DappsController';
import { TokenController } from '../controllers/TokenController';
import { NewsController } from '../controllers/NewsController';
import { AccountController } from '../controllers/AccountController';

const router: Router = express.Router();

router.get('/nft', NftController.getNft); 
router.get('/dapps', DappsController.getDapps);
router.get('/token', TokenController.getTokenPrice)
router.get('/news', NewsController.getNews),
router.get('/balance', AccountController.getEthBalance)
router.get('/balance/token', AccountController.getTokenBalance)
router.get('/tx', AccountController.getEthTransaction)
router.get('/token/tx', AccountController.getTokenTransfer)


export default router;

