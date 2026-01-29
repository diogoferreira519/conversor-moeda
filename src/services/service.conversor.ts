import { ModelConversor } from '../model/model.conversor.js';
import axios from 'axios';
import { parametros } from '../utils/parametros.js';
import { ExternoApiErro } from '../errors/error.api.js';
import { rateCache } from '../cache/rate.cache.js';

export class ServiceConversor {
    private modelConversor: ModelConversor;
    private readonly apiUrl: string;

    constructor(modelConversor: ModelConversor) {
        this.modelConversor = modelConversor
        this.apiUrl = process.env.API_CONVERSOR_KEY ?? '';
    }

    public async converter(): Promise<void> {

        let cotacao: number;

        const cacheKey =
            `${this.modelConversor.getMoedaDestino()}-${this.modelConversor.getMoedaOrigem()}`;

        const cacheCotacao = rateCache.get<number>(cacheKey);

        if (cacheCotacao) {
            this.modelConversor.setFonteDado('CACHE');
            this.modelConversor.setValorConvertido(this.calculaConversao(this.modelConversor.getValor(), cacheCotacao))
            return;
        }
        const params = parametros({
            base_currency: this.modelConversor.getMoedaDestino(),
            currencies: this.modelConversor.getMoedaOrigem(),
        })
        let response;

        try {
            response = await axios.get(`${this.apiUrl}&${params}`);
        } catch (err) {
            throw err;
        }

        if (!response.data) {
            throw new ExternoApiErro('Não foi possível realizar a conversão');
        }
        cotacao = response.data.data[this.modelConversor.getMoedaOrigem()];

        if (!cotacao) {
            throw new ExternoApiErro('Não foi possível buscar a conversão')
        }

        rateCache.set(cacheKey, cotacao);

        this.modelConversor.setValorConvertido(this.calculaConversao(this.modelConversor.getValor(), cotacao));
        this.modelConversor.setFonteDado('API');
    }

    private calculaConversao(valor: number, cotacao: number): number {
        return Number((valor * cotacao).toFixed(2));
    }
}

