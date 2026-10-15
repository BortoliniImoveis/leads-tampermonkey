// ==UserScript==
// @name         CARDS COM CORES LEADS
// @namespace    http://tampermonkey.net/
// @version      1.0.3
// @description  try to take over the world!
// @author       Iago Alencar
// @match        https://bortoliniimoveis.bitrix24.com.br/crm/lead/kanban/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bitrix24.com.br
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/BortoliniImoveis/leads-tampermonkey/main/script.user.js
// @updateURL    https://raw.githubusercontent.com/BortoliniImoveis/leads-tampermonkey/main/script.user.js
// ==/UserScript==

(function () {
    'use strict';

    function aplicarCores() {

        document.querySelectorAll(".crm-kanban-item").forEach(card => {

            let status = "";

            const fields = card.querySelectorAll(".crm-kanban-item-fields-item");

            fields.forEach(f => {

                const title = f.querySelector(".crm-kanban-item-fields-item-title-text");
                const value = f.querySelector(".crm-kanban-item-fields-item-value");

                if (!title || !value) return;

                if (title.innerText.includes("Status do Atendimento")) {
                    status = value.innerText.trim().toUpperCase();
                }

            });

            if (!status) card.style.backgroundColor = "";

            if (status.includes("❌AGUARDANDO RETORNO❌")) {
                card.style.backgroundColor = "#ffb3b3"; // vermelho claro
            }

            else if (status.includes("EM ATENDIMENTO")) {
                card.style.backgroundColor = "#b3f2cc";
            }

            else if (status.includes("CHAMAR NOVAMENTE")) {
                card.style.backgroundColor = "#b3d9ff"; // azul claro
            }

            else if (status.includes("DESOCUPAÇÃO")) {
                card.style.backgroundColor = "#b390cc"; // roxo
            }

            else if (status.includes("AGUARDANDO IMÓVEL")) {
                card.style.backgroundColor = "#d9b3ff"; // roxo claro
            }

            else if (status.includes("CADÊNCIA")) {
                card.style.backgroundColor = "#fff3b3"; // amarelo pastel
            }

            else {
                card.style.backgroundColor = ""; // cor padrão
            }

        });

    }

    // roda inicial
    setTimeout(aplicarCores, 2000);

    // observa mudanças do Kanban (Bitrix SPA)
    const observer = new MutationObserver(aplicarCores);
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

})();