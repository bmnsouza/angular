import { NegociacaoController } from './controllers/NegociacaoController';

const controller = new NegociacaoController();
(<Element>document.querySelector('.form'))
  .addEventListener('submit', controller.adiciona.bind(controller));
 
(<HTMLElement>document.getElementById('botao-importa'))
  .addEventListener('click', controller.importaDados.bind(controller));