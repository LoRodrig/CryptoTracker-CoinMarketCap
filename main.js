var apiKey = {
    key: '5acf697d-17c6-45a9-8f98-44a022a03c50'
};


function buscarMoeda(siglaMoeda) {
    var apiUrl = ` https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${siglaMoeda}&CMC_PRO_API_KEY=${apiKey.key}`;

    return request('GET', apiUrl)
        .then((r1) => {
            var x1 = JSON.parse(r1.target.responseText);
            var moedaInfo = x1.data[siglaMoeda]?.quote.USD;

            if (moedaInfo) {
                return {
                    nome: x1.data[siglaMoeda].name,
                    preco: moedaInfo.price
                };
            } else {
                throw new Error("Moeda não encontrada.");
            }
        })
        .catch(err => {
            throw err;
        });
}

function request(method, url) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onload = resolve;
        xhr.onerror = reject;
        xhr.send();
    });
}

document.querySelector(".botão-pesquisar").addEventListener("click", function (event) {
    event.preventDefault();
    var siglaMoeda = document.querySelector(".inputmoeda").value.trim().toUpperCase();

    buscarMoeda(siglaMoeda)
        .then(resposta => {
            console.log(`Nome da Moeda: ${resposta.nome}`);
            console.log(`Preço em USD: ${resposta.preco}`);
            document.querySelector(".precoMoeda").textContent = `$ ${resposta.preco}`;
        })
        .catch(err => {
            console.log(err);
            document.querySelector(".precoMoeda").textContent = "Erro ao buscar a moeda.";
        });
});
