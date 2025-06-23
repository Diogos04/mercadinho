const usuario = localStorage.getItem("usuario");
document.getElementById("usuario").textContent = usuario ?? "Visitante";
document.getElementById("nomePopup").textContent = usuario ?? "Visitante";

// Mostrar o popup
const popup = document.getElementById("popup");
popup.style.display = "block";

// Fechar manualmente
document.getElementById("fecharPopup").addEventListener("click", () => {
    popup.style.display = "none";
});

// Fechar automaticamente após 5 segundos
setTimeout(() => {
    popup.style.display = "none";
}, 5000);

// Função para carregar os produtos
async function carregarProdutos() {
    try {
        const resposta = await fetch("https://fakestoreapi.com/products");
        const produtos = await resposta.json();
        const container = document.getElementById("produtos");

        produtos.forEach(prod => {
            const card = document.createElement("div");
            card.className = "produto";

            const img = document.createElement("img");
            img.src = prod.image;
            img.alt = prod.title;
            img.width = 100;

            const titulo = document.createElement("h3");
            titulo.textContent = prod.title;

            const desc = document.createElement("p");
            desc.textContent = prod.description.substring(0, 100) + "...";

            const preco = document.createElement("p");
            preco.innerHTML = `<strong>R$ ${prod.price}</strong>`;

            const botao = document.createElement("button");
            botao.textContent = "Adicionar ao Carrinho";
            botao.addEventListener("click", () => adicionarAoCarrinho(prod));

            card.appendChild(img);
            card.appendChild(titulo);
            card.appendChild(desc);
            card.appendChild(preco);
            card.appendChild(botao);

            container.appendChild(card);
        });
    } catch (erro) {
        console.error("Erro ao carregar produtos:", erro);
    }
}

// Função para adicionar ao carrinho
function adicionarAoCarrinho(produto) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    const existente = carrinho.find(item => item.id === produto.id);

    if (existente) {
        existente.quantidade += 1;
    } else {
        produto.quantidade = 1;
        carrinho.push(produto);
    }

    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    atualizarQtdCarrinho();
    mostrarMensagem();
}

function mostrarMensagem() {
    const msg = document.getElementById("mensagemFlutuante");
    msg.classList.add("mostrar");
    setTimeout(() => {
        msg.classList.remove("mostrar");
    }, 2000);
}

function atualizarQtdCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    const totalItens = carrinho.reduce((soma, item) => soma + item.quantidade, 0);
    document.getElementById("qtdCarrinho").textContent = totalItens;
}

carregarProdutos();
atualizarQtdCarrinho(); 