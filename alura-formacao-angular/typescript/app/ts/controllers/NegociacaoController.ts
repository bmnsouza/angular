import { NegociacoesView, MensagemView } from '../views/index';
import { Negociacoes, Negociacao, NegociacaoParcial } from '../models/index';
import { domInject, throttle } from '../helpers/decorators/index';
import { NegociacaoService } from '../services/index';
import { imprime } from '../helpers/index';

export class NegociacaoController {

  @domInject('#data')
  private _inputData: HTMLInputElement;

  @domInject('#quantidade')
  private _inputQuantidade: HTMLInputElement;

  @domInject('#valor')
  private _inputValor: HTMLInputElement;

  private _negociacoes = new Negociacoes();
  private _negociacoesView = new NegociacoesView('#negociacoesView');
  private _mensagemView = new MensagemView('#mensagemView');
  private _service = new NegociacaoService();

  constructor() {
    this._negociacoesView.update(this._negociacoes);
  }

  @throttle()
  adiciona() {
    let data = new Date(this._inputData.value.replace(/-/g, ','));

    if (!this._isDiaUtil(data)) {
      this._mensagemView.update('Somente negociações em dias úteis, por favor!');
      return;
    }

    const negociacao = new Negociacao(
      data,
      parseInt(this._inputQuantidade.value),
      parseFloat(this._inputValor.value)
    );

    this._negociacoes.adiciona(negociacao);
    this._negociacoesView.update(this._negociacoes);
    this._mensagemView.update('Negociação adicionada com sucesso');

    imprime(negociacao, this._negociacoes);
    imprime(negociacao, this._negociacoes, { paraTexto: () => console.log('oi') });
  }

  private _isDiaUtil(data: Date) {
    let isDiaUtil = false;

    if (data.getDay() != DiaDaSemana.Sabado && data.getDay() != DiaDaSemana.Domingo) {
      isDiaUtil = true;
    }

    return isDiaUtil;
  }

  @throttle()
  async importaDados() {

    try {
      const negociacoesParaImportar = await this._service
        .obterNegociacoes(res => {
          if (res.ok) {
            return res;
          } else {
            throw new Error(res.statusText);
          }
        });

      const negociacoesJaImportadas = this._negociacoes.paraArray();

      negociacoesParaImportar
        .filter(negociacao =>
          !negociacoesJaImportadas.some(jaImportada =>
            negociacao.isIgual(jaImportada)))
        .forEach(negociacao =>
          this._negociacoes.adiciona(negociacao));

      this._negociacoesView.update(this._negociacoes);
      
    } catch (err) {
      this._mensagemView.update(err.message);
    }
  }
}

enum DiaDaSemana {
  Domingo,
  Segunda,
  Terca,
  Quarta,
  Quinta,
  Sexta,
  Sabado
}