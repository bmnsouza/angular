System.register(["./controllers/NegociacaoController"], function (exports_1, context_1) {
    "use strict";
    var NegociacaoController_1, controller;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (NegociacaoController_1_1) {
                NegociacaoController_1 = NegociacaoController_1_1;
            }
        ],
        execute: function () {
            controller = new NegociacaoController_1.NegociacaoController();
            document.querySelector('.form')
                .addEventListener('submit', controller.adiciona.bind(controller));
            document.getElementById('botao-importa')
                .addEventListener('click', controller.importaDados.bind(controller));
        }
    };
});
