import { logarTempoDeExecucao } from '../helpers/decorators/index';

export abstract class View<T> {

  protected _elemento: Element;
  private _escapar: boolean;

  constructor(seletor: string, escapar: boolean = false) {
    this._elemento = <Element> document.querySelector(seletor);
    this._escapar = escapar;
  }

  @logarTempoDeExecucao(true)
  update(model: T) {
    
    let template = this.template(model);
    if (this._escapar) {
      template = template.replace(/<script>[\s\S]*?<\/script>/, '');
    }
    this._elemento.innerHTML = template;
  }

  abstract template(model: T): string;
}