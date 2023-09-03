import { renderizarCatalogo } from "./src/cartaoProduto";
import {
  inicializarCarrinho,
  atualizarPrecoCarrinho,
  renderizarProdutosCarrinho,
  atualizarPrecoTotalCard,
} from "./src/menuCarrinho";
import { inicializarFiltros } from "./src/filtrosCatalogo";

renderizarCatalogo();
inicializarCarrinho();
renderizarProdutosCarrinho();
atualizarPrecoCarrinho();
inicializarFiltros();
