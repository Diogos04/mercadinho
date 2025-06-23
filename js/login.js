
const form = document.getElementById("cadastroForm");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const login = document.getElementById("login").value;
    const senha = document.getElementById("senha").value;

    if (login && senha) {
        localStorage.setItem("usuario", login); // agora usa localStorage
        window.location.href = "mercado.html";
    } else {
        document.getElementById("mensagem").textContent = "Preencha os campos!";
    }
});
