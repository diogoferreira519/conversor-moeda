import { Request, Response, NextFunction } from 'express';
import { ModelConversor } from '../model/model.conversor.js';

class ServiceConversor {
    private modelConversor: ModelConversor;
    private readonly apiUrl: string; 

    constructor(modelConversor: ModelConversor) {
        this.modelConversor = modelConversor
        this.apiUrl = process.env.API_URL_AWESOME ?? '';
    }
    
    private converter() {
        
    }
}

