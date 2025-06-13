function adicionarCarrinho() {// função pra adicionar prato no carrinho 
    let prato = document.getElementById("prato").value;
    let valortotal = document.getElementById("total");
    let mostrarPedido = document.getElementById("pedidos");

    let preco = 0;

    if (prato === "Hambúrguer") {//Verificar o prato que a pessoa escolheu e colocar um preço
        preco = 20;
    } else if (prato === "Sushi") {
        preco = 35;
    } else if (prato === "Bloom Omnion") {
        preco = 60;
    }
    valortotal.innerHTML = "Total: R$ " + preco;//mostrar o valor do prato que a pessoa escolheu
    mostrarPedido.innerHTML = prato;//mostrar o prato que a pessoa escolheu
}
function removerCarrinho() {//se a pessoa não quiser mais o pedido, podemos remover aqui
    let prato = document.getElementById("prato").value;
    let valortotal = document.getElementById("total");
    let mostrarPedido = document.getElementById("pedidos")

    valortotal.innerHTML = "Total: R$ 0,00"
    mostrarPedido.innerHTML = ""
}
function fazerPedido() {
    const prato = document.getElementById("prato").value;
    const email = document.getElementById("email").value;
    const endereco = document.getElementById("endereco").value;
    const totalText = document.getElementById("total").innerText;

    
    // Remove todos os caracteres que não são números, vírgulas ou pontos
    // Ex: "R$ 25,00" vira "25,00", e depois "25.00"
    const precoStr = totalText.replace(/[^\d,\.]/g, "").replace(",", ".");
    const preco = parseFloat(precoStr);


    // Envia os dados em formato JSON para o back-end lá no app.py
    fetch("http://localhost:5000/fazer_pedido", {
        method: "POST",// metodo post para enviar os dados
        headers: {
            "Content-Type": "application/json"//indica que os dados são formato json
        },
        //converte os dados dos inputs em json e envia 
        body: JSON.stringify({ prato, preco, email, endereco })
    })
    .then(response => response.json()) // Converte a resposta do servidor em JSON
    .then(data => alert(data.message || data.error)) // Mostra alerta com a mensagem de sucesso ou erro
    .catch(error => alert("Erro ao enviar pedido: " + error)); // Trata erros de rede ou servidor indisponível
}
