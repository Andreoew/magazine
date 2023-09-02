import { catalogo } from "./lista-catalogo-produtos";
import { adicionarAoCarrinho } from "./menuCarrinho";

export function renderizarCatalogo() {
  for (const produtoCatalogo of catalogo) {
    const cartaoProduto = `<div class='flex flex-col border-solid w-48 m-2  p-2 justify-between group shadow-xl shadow-slate-400 rounded-lg ${
      produtoCatalogo.feminino ? "feminino" : "masculino"
    }' id="card-produto-${produtoCatalogo.id}">
        <img 
          src="./assets/img/${produtoCatalogo.imagem}" 
          alt="product-1 do Magazine Hashtag" 
          class='group-hover:scale-110 duration-300 my-3 rounded-lg'
        >
        <p class='text-sm font-bold'>${produtoCatalogo.marca}</p>
        <p class='text-sm'>${produtoCatalogo.nome}</p>
        <p class='text-green-700 text-lg'>${new Intl.NumberFormat("br-BR", {
          style: "currency",
          currency: "BRL",
        }).format(produtoCatalogo.preco)}</p>
        <button id='adicionar-${
          produtoCatalogo.id
        }' class='bg-slate-950 text-slate-200 hover:bg-slate-700'><i class="fa-solid fa-cart-plus"></i></button>
        </div>`;

    // document.getElementById("container-produto").innerHTML += cartaoProduto;
    const containerProduto = document.querySelector("#container-produto");
    if (containerProduto) {
      // O elemento existe
      containerProduto.innerHTML += cartaoProduto;
    } else {
      // O elemento não existe
      console.log("O elemento container-produto não existe.");
    }
  }

  for (const produtoCatalogo of catalogo) {
    document
      .getElementById(`adicionar-${produtoCatalogo.id}`)
      .addEventListener("click", () => adicionarAoCarrinho(produtoCatalogo.id));
  }
}
