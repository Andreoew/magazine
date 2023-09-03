import { catalogo } from "./lista-catalogo-produtos";
import { idsProdutosCarrinhoComQuantidade } from "./menuCarrinho";

export function salvarLocalStorage(chave, informacao) {
  localStorage.setItem(chave, JSON.stringify(informacao));
}

export function lerLocalStorage(chave) {
  return JSON.parse(localStorage.getItem(chave));
}

export function apagarDoLocalStorage(chave) {
  localStorage.removeItem(chave);
}

export function desenharProdutoCarrinhoSimples(
  idProduto,
  idContainerHtml,
  quantidadeProduto
) {
  const produto = catalogo.find((p) => p.id === idProduto);
  const containerProdutosCarrinho = document.getElementById(idContainerHtml);

  const elementoArticle = document.createElement("article");
  const articleClasses = [
    "flex",
    "bg-stone-200",
    "rounded-lg",
    "p-1",
    "relative",
    "mb-2",
    "w-96",
  ];

  for (const articleClass of articleClasses) {
    elementoArticle.classList.add(articleClass);
  }

  const cartaoProdutoCarrinho = `
    <img
      src="./assets/img/${produto.imagem}"
      alt="Carrinho: ${produto.nome}"
      class="h-24 rounded-lg"
    />
    <div class="p-2 flex flex-col justify-between">
      <p class="text-slate-900 text-sm">
        ${produto.nome}
      </p>
      <p class="text-slate-400 text-xs">Tamanho: M</p>
      <p class="text-green-700 text-lg">${new Intl.NumberFormat("br-BR", {
        style: "currency",
        currency: "BRL",
      }).format(produto.preco)}</p>
      <p id='preco-total-${
        produto.id
      }' class="text-green-800 text-lg font-bold">${new Intl.NumberFormat(
    "br-BR",
    {
      style: "currency",
      currency: "BRL",
    }
  ).format(produto.preco * idsProdutosCarrinhoComQuantidade[produto.id])}</p> 
    </div>
    <div class='flex text-slate-950 items-end absolute bottom-0 right-2 text-lg'>
        <label class='text-sm text-slate-400'>Qnt:</label>
        <p id='quantidade-${
          produto.id
        }' class='ml-2 bg-slate-300 rounded-full w-7 items-center flex justify-center h-7'>${quantidadeProduto}</p>
    </div>`;

  elementoArticle.innerHTML = cartaoProdutoCarrinho;
  containerProdutosCarrinho.appendChild(elementoArticle);
}
