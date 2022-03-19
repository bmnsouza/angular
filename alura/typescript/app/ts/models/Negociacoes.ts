import { Negociacao } from './Negociacao';
import { MeuObjeto } from './MeuObjeto';

export class Negociacoes implements MeuObjeto<Negociacoes> {

  private _negociacoes: Array<Negociacao> = [];

  adiciona(negociacao: Negociacao): void {
    this._negociacoes.push(negociacao);
  }

  paraArray(): Array<Negociacao> {
    return ([] as Negociacao[]).concat(this._negociacoes);
  }

  paraTexto(): void {
    console.log('-- paraTexto --');
    console.log(JSON.stringify(this._negociacoes));
  }

  isIgual(negociacoes: Negociacoes): boolean {
    return JSON.stringify(this._negociacoes) == JSON.stringify(negociacoes.paraArray());
  }
}