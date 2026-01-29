import { Router } from 'express';
import { conversorController } from '../controllers/controller.conversor.js';
//import { convertController } from '../controllers/convert.controller.js';

const router = Router();

router.get('/conversor', conversorController);

router.post('/conversor', conversorController);

export default router;
