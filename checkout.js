import {
  desenharProdutoCarrinhoSimples,
  lerLocalStorage,
  apagarDoLocalStorage,
  salvarLocalStorage,
} from "./src/utilidades";
import { idsProdutosCarrinhoComQuantidade } from "./src/menuCarrinho";
import { catalogo } from "./src/lista-catalogo-produtos";

function atualizarPrecoCheckout() {
  const precoCarrinho = document.getElementById("preco-total");
  let precoTotalCarrinho = 0;
  for (const idProdutoNoCarrinho in idsProdutosCarrinhoComQuantidade) {
    precoTotalCarrinho +=
      catalogo.find((p) => p.id === idProdutoNoCarrinho).preco *
      idsProdutosCarrinhoComQuantidade[idProdutoNoCarrinho];
  }
  precoCarrinho.innerText = `Total: ${new Intl.NumberFormat("br-BR", {
    style: "currency",
    currency: "BRL",
  }).format(precoTotalCarrinho)}`;
}

atualizarPrecoCheckout();

function desenharProdutosCheckout() {
  const idsProdutoCarrinhoComQuantidade = lerLocalStorage("carrinho") ?? {};
  for (const idProduto in idsProdutoCarrinhoComQuantidade) {
    desenharProdutoCarrinhoSimples(
      idProduto,
      "container-produtos-checkout",
      idsProdutoCarrinhoComQuantidade[idProduto]
    );
  }
}

function finalizarCompra(evento) {
  evento.preventDefault();
  const idsProdutoCarrinhoComQuantidade = lerLocalStorage("carrinho") ?? {};
  if (Object.keys(idsProdutoCarrinhoComQuantidade).length === 0) {
    return;
  }

  const dataAtual = new Date();
  const pedidoFeito = {
    dataPedido: dataAtual,
    pedido: idsProdutoCarrinhoComQuantidade,
  };

  const historicoDePedidos = lerLocalStorage("historico") ?? [];
  const historicoDePedidosAtualizado = [pedidoFeito, ...historicoDePedidos];

  salvarLocalStorage("historico", historicoDePedidosAtualizado);

  apagarDoLocalStorage("carrinho");

  window.location.href = +"./pedidos.html";
}

desenharProdutosCheckout();

document.addEventListener("submit", (evt) => finalizarCompra(evt));
