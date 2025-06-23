// pedido.js

window.addEventListener("DOMContentLoaded", () => {
    const usuario = localStorage.getItem("usuario") || "Visitante";
    const endereco = localStorage.getItem("endereco") || "Endereço não informado";
    const pagamento = localStorage.getItem("pagamento") || "Método não informado";

    document.getElementById("cliente").textContent = usuario;
    document.getElementById("enderecoEntrega").textContent = endereco;
    document.getElementById("pagamentoEscolhido").textContent = pagamento;

    // Limpa os dados após exibir
    localStorage.removeItem("endereco");
    localStorage.removeItem("pagamento");
    localStorage.removeItem("pedidoConfirmado");
});
