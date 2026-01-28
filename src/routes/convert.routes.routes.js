import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { convertController } from '../controllers/convert.controller.js';
import { convertValidator } from '../validators/convert.validator.js';

const router = Router();

router.get(
  '/convert',
  authMiddleware,
  convertValidator,
  convertController
);

router.post(
  '/convert',
  authMiddleware,
  convertValidator,
  convertController
);

export default router;
