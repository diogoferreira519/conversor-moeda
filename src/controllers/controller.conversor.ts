import { Request, Response, NextFunction } from 'express';
import { ModelConversor } from '../model/model.conversor.js';
import { ValidacaoError } from '../errors/error.validation.js';
import { ExternoApiErro } from '../errors/error.api.js';
import { ServiceConversor } from '../services/service.conversor.js';

export class ControllerConversor {

    public async conversorController(req: Request, res: Response, next: NextFunction) {
        try {
            const { de, para, valor } = req.body;

            const modelConversor = new ModelConversor(de, para, valor);

            await new ServiceConversor(modelConversor).converter();
            
            return res.status(200).json(modelConversor)

        }
        catch (error) {
            if (error instanceof ValidacaoError) {
                return res.status(400).json({ error: error.message });
            }

            if (error instanceof ExternoApiErro) {
                return res.status(503).json({ error: error.message });
            }

            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }
}