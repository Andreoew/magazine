import { catalogo } from "./lista-catalogo-produtos";
import { salvarLocalStorage, lerLocalStorage } from "./utilidades";

export const idsProdutosCarrinhoComQuantidade =
  lerLocalStorage("carrinho") ?? {};

function abrirCarrinho() {
  document.getElementById("carrinho").classList.add("right-[0px]");
  document.getElementById("carrinho").classList.remove("right-[-360px]");
}

function fecharCarrinho() {
  document.getElementById("carrinho").classList.remove("right-[0px]");
  document.getElementById("carrinho").classList.add("right-[-360px]");
}

function irParaCheckout() {
  if (Object.keys(idsProdutosCarrinhoComQuantidade).length === 0) {
    return;
  }
  window.location.href = "./checkout.html";
}

export function inicializarCarrinho() {
  const botaoFecharCarrinho = document.getElementById("fechar-carrinho");
  const botaoAbrirCarrinho = document.getElementById("abrir-carrinho");
  const botaoIrParaCheckout = document.getElementById("finalizar-compra");

  botaoFecharCarrinho.addEventListener("click", fecharCarrinho);
  botaoAbrirCarrinho.addEventListener("click", abrirCarrinho);
  botaoIrParaCheckout.addEventListener("click", irParaCheckout);
}

function removerDoCarrinho(idProduto) {
  delete idsProdutosCarrinhoComQuantidade[idProduto];
  salvarLocalStorage("carrinho", idsProdutosCarrinhoComQuantidade);
  atualizarPrecoCarrinho();
  renderizarProdutosCarrinho();
}

function incrementarQuantidadeProduto(idProduto) {
  idsProdutosCarrinhoComQuantidade[idProduto]++;
  salvarLocalStorage("carrinho", idsProdutosCarrinhoComQuantidade);
  atualizarPrecoCarrinho();
  atualizarInformacaoQuantidade(idProduto);
}

function decrementarQuantidadeProduto(idProduto) {
  if (idsProdutosCarrinhoComQuantidade[idProduto] === 1) {
    salvarLocalStorage("carrinho", idsProdutosCarrinhoComQuantidade);
    removerDoCarrinho(idProduto);
    return;
  }
  console.log(idsProdutosCarrinhoComQuantidade);
  idsProdutosCarrinhoComQuantidade[idProduto]--;
  atualizarPrecoCarrinho();
  atualizarInformacaoQuantidade(idProduto);
}

function atualizarInformacaoQuantidade(idProduto) {
  document.getElementById(`quantidade-${idProduto}`).innerText =
    idsProdutosCarrinhoComQuantidade[idProduto];
}

function desenhaProdutoNoCarrinho(idProduto) {
  const produto = catalogo.find((p) => p.id === idProduto);
  const containerProdutosCarrinho =
    document.getElementById("produtos-carrinho");

  const elementoArticle = document.createElement("article");
  const articleClasses = [
    "flex",
    "bg-slate-100",
    "rounded-lg",
    "p-1",
    "relative",
  ];

  for (const articleClass of articleClasses) {
    elementoArticle.classList.add(articleClass);
  }

  const cartaoProdutoCarrinho = `  
    <button class="absolute top-0 right-2" id='remover-item-${produto.id}'>
      <i class="fa-solid fa-circle-xmark text-slate-500 hover:text-red-500"></i>
    </button>
    <img src="./assets/img/${produto.imagem}" alt="Carrinho: ${
    produto.nome
  }" class="h-24 rounded-lg">
    <div class="p-2 flex flex-col justify-between">
      <p class="text-slate-900 text-sm">${produto.nome}</p>
      <p class="text-slate-400 text-xs">Tamanho: M</p>
      <p class="text-green-700 text-lg">${new Intl.NumberFormat("br-BR", {
        style: "currency",
        currency: "BRL",
      }).format(produto.preco)}</p>
    </div>
    <div class='flex text-slate-950 items-end absolute bottom-0 right-2 text-lg'>
      <button id='decrementar-produto-${
        produto.id
      }' class=' hover:text-red-500'>-</button>
        <p id='quantidade-${produto.id}' class='ml-2'>${
    idsProdutosCarrinhoComQuantidade[produto.id]
  }</p>
      <button id='incrementar-produto-${produto.id}' class='ml-2'>+</button>
    </div>  
  `;
  elementoArticle.innerHTML = cartaoProdutoCarrinho;
  containerProdutosCarrinho.appendChild(elementoArticle);

  document
    .getElementById(`decrementar-produto-${produto.id}`)
    .addEventListener("click", () => decrementarQuantidadeProduto(produto.id));

  document
    .getElementById(`incrementar-produto-${produto.id}`)
    .addEventListener("click", () => incrementarQuantidadeProduto(produto.id));

  document
    .getElementById(`remover-item-${produto.id}`)
    .addEventListener("click", () => removerDoCarrinho(produto.id));
}

export function renderizarProdutosCarrinho() {
  const containerProdutosCarrinho =
    document.getElementById("produtos-carrinho");
  containerProdutosCarrinho.innerHTML = "";

  for (const idProduto in idsProdutosCarrinhoComQuantidade) {
    desenhaProdutoNoCarrinho(idProduto);
  }
}

export function adicionarAoCarrinho(idProduto) {
  if (idProduto in idsProdutosCarrinhoComQuantidade) {
    incrementarQuantidadeProduto(idProduto);
    return;
  }
  idsProdutosCarrinhoComQuantidade[idProduto] = 1;
  salvarLocalStorage("carrinho", idsProdutosCarrinhoComQuantidade);
  desenhaProdutoNoCarrinho(idProduto);
  atualizarPrecoCarrinho();
}

export function atualizarPrecoCarrinho() {
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
