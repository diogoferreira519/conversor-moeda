import { Request, Response, NextFunction } from 'express';
import { ModelConversor } from '../model/model.conversor.js';
import axios from 'axios';
import { parametros } from '../utils/parametros.js';
import { ExternoApiErro } from '../errors/error.api.js';

export class ServiceConversor {
    private modelConversor: ModelConversor;
    private readonly apiUrl: string;

    constructor(modelConversor: ModelConversor) {
        this.modelConversor = modelConversor
        this.apiUrl = process.env.API_CONVERSOR_KEY ?? '';
    }

    public async converter() :Promise<void>{
        try {
            const params = parametros({
                base_currency: this.modelConversor.getMoedaDestino(),
                currencies: this.modelConversor.getMoedaOrigem(),
            })

            const response = await axios.get(`${this.apiUrl}&${params}`);

            if (!response.data) {
                throw new ExternoApiErro('Não foi possível realizar a conversão')
            }
            const valorDeConversao = response.data.data[this.modelConversor.getMoedaOrigem()];

            if (!valorDeConversao) {
                throw new ExternoApiErro('Não foi possível buscar a conversão')
            }

            const valorConvertido = Number((this.modelConversor.getValor() * valorDeConversao).toFixed(2));
            
            this.modelConversor.setValorConvertido(valorConvertido);
        }
        catch (error) {
            console.log(error);
        }
    }
}

