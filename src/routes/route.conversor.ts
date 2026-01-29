import { Router } from 'express';
import { ControllerConversor } from '../controllers/controller.conversor.js';

const router = Router();

const controller = new ControllerConversor();

router.post('/conversor', controller.conversorController);

export default router;
