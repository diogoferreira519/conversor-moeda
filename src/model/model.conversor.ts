import { ValidacaoError } from "../errors/error.validation.js";

export class ModelConversor {
  private moedaOrigem: string;
  private moedaDestino: string;
  private valor: number;
  private valorConvertido?: number;
  private fonteDado?: string;

  constructor(
    moedaOrigem: string,
    moedaDestino: string,
    valor: number,
    valorConvertido?: number
  ) {
    this.validaMoeda(moedaOrigem);
    this.validaMoeda(moedaDestino);
    if (!valor || valor == null) {
      throw new ValidacaoError('Valor não pode estar em branco ou ser nulo')
    } else if (valor <= 0) {
      throw new ValidacaoError('Valor deve ser maior que zero');
    } else if (typeof valor !== 'number' || isNaN(valor)) {
      throw new ValidacaoError('Valor deve ser um número válido');
    }

    this.moedaOrigem = moedaOrigem.toUpperCase();
    this.moedaDestino = moedaDestino.toUpperCase();

    if (this.moedaDestino === this.moedaOrigem) {
      throw new ValidacaoError('Moeda de origem e destino não podem ser iguais');
    }
    this.valor = valor;
    this.valorConvertido = valorConvertido;
  }


  public getMoedaOrigem(): string {
    return this.moedaOrigem;
  }

  public getMoedaDestino(): string {
    return this.moedaDestino;
  }

  public getValor(): number {
    return this.valor;
  }

  public getValorConvertido(): number | undefined {
    return this.valorConvertido;
  }

  public setValorConvertido(valorConvertido: number): void {
    this.valorConvertido = valorConvertido;
  }

  public getFonteDado() {
    return this.fonteDado;
  }

  public setFonteDado(fonteDado: string) {
    this.fonteDado = fonteDado;
  }

  private validaMoeda(moeda: string): void {
    if (!moeda || moeda.length !== 3 || !/^[A-Z]{3}$/i.test(moeda)) {
      throw new ValidacaoError(`Moeda inválida: ${moeda}`);
    }
  }
}
