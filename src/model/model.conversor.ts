import { ValidacaoError } from "../errors/error.validation.js";

export class ModelConversor {
  private moedaOrigem: string;
  private moedaDestino: string;
  private valor: number;
  private valorConvertido?: number;

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
    }
    if (valor <= 0) {
      throw new ValidacaoError('Valor deve ser maior que zero');
    }

    this.moedaOrigem = moedaOrigem.toUpperCase();
    this.moedaDestino = moedaDestino.toUpperCase();
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

  private validaMoeda(moeda: string): void {
    if (!moeda || moeda.length !== 3) {
      throw new ValidacaoError(`Moeda inválida: ${moeda}`);
    }
  }
}
