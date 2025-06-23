function carregarCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    const lista = document.getElementById("lista-carrinho");
    const totalSpan = document.getElementById("total");
    let total = 0;

    lista.innerHTML = "";

    if (carrinho.length === 0) {
        lista.innerHTML = "<p>Seu carrinho está vazio.</p>";
        totalSpan.textContent = "R$ 0,00";
        return;
    }

    carrinho.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "produto";

        const subtotal = item.price * item.quantidade;
        total += subtotal;

        div.innerHTML = `
    <img src="${item.image}" alt="${item.title}">
    <div class="produto-info">
        <h4>${item.title}</h4>
        <label>Qtd:
            <input type="number" min="1" value="${item.quantidade}" onchange="alterarQuantidade(${index}, this.value)" />
        </label>
        <p>Preço: R$ ${item.price.toFixed(2)}</p>
        <p><strong>Subtotal: R$ ${(item.price * item.quantidade).toFixed(2)}</strong></p>
    </div>
    <button onclick="removerItem(${index})">Remover</button>
`;

        lista.appendChild(div);
    });

    totalSpan.textContent = `R$ ${total.toFixed(2)}`;
}

function removerItem(index) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    carrinho.splice(index, 1);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    carregarCarrinho();
}

document.getElementById("finalizarCompra").addEventListener("click", () => {
    if (confirm("Deseja realmente finalizar sua compra?")) {
        localStorage.removeItem("carrinho");
        alert("Compra finalizada com sucesso! Obrigado pela preferência. 🛍️");
        carregarCarrinho();
    }
});

function alterarQuantidade(index, novaQtd) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    novaQtd = parseInt(novaQtd);

    if (novaQtd >= 1) {
        carrinho[index].quantidade = novaQtd;
        localStorage.setItem("carrinho", JSON.stringify(carrinho));
        carregarCarrinho();
    }
}

function removerItem(index) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    carrinho.splice(index, 1);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    carregarCarrinho();
}

// Finalizar compra
document.getElementById("formCheckout").addEventListener("submit", function (e) {
    e.preventDefault();

    const endereco = document.getElementById("endereco").value;
    const pagamento = document.getElementById("pagamento").value;

    if (!endereco || !pagamento) {
        alert("Preencha todos os campos!");
        return;
    }

    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    if (carrinho.length === 0) {
        alert("Carrinho vazio.");
        return;
    }

    localStorage.setItem("endereco", endereco);
    localStorage.setItem("pagamento", pagamento);
    localStorage.setItem("pedidoConfirmado", "true");

    window.location.href = "pedido.html";
});

carregarCarrinho();