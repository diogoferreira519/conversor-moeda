import { Router } from 'express';
import { ControllerConversor } from '../controllers/controller.conversor.js';
//import { convertController } from '../controllers/convert.controller.js';

const router = Router();

const controller = new ControllerConversor();

router.get('/conversor', controller.conversorController);

router.post('/conversor', controller.conversorController);

export default router;
