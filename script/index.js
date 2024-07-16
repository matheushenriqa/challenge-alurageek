const produtosContainer = document.querySelector('.cards_container')
const inputNome = document.querySelector('.input_nome')
const inputPreco = document.querySelector('.input_preco')
const inputImagem = document.querySelector('.input_imagem')

const botaoExcluir = document.querySelector('.excluir_produto')

let produtos =[];


pegarDados()  

async function pegarDados() {
    const resposta = await fetch('http://localhost:3000/produtos')
    produtos = await resposta.json()
    
    renderizarProdutos(produtos)
}

function limparCampos() {
    inputNome.value = ''
    inputPreco.value = ''
    inputImagem.value = ''
}

async function renderizarProdutos() {
    produtosContainer.innerHTML = ''

    produtos.forEach(produto => {
        produtosContainer.innerHTML += `
            <div class="card" data-id="${produto.id}">
                <img class="foto_produto" src="${produto.imagem}" alt="Imagem de ${produto.nome}" >
                <div class="card_info">
                    <p class="nome_produto">${produto.nome}</p>
                    <h3 class="preco_produto">$ ${String(produto.preco)}</h3>
                    <button  onclick="excluirProduto(event)" class="excluir_produto">
                        <img src="./images/icone-lixeira.png" alt="Icone de uma lixeira">
                    </button>
                </div>
            </div>
        `
    });

    limparCampos()
}

function adicionarProduto() {

    const nome = inputNome.value
    const preco = Number(inputPreco.value)
    const imagem = inputImagem.value

    const produto = {
        nome,
        preco: preco,
        imagem
    }

    fetch('http://localhost:3000/produtos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(produto)
    })
   .then(pegarDados)
   .catch(erro => console.log(erro))

   pegarDados()
}

function excluirProduto(event) {
    const card = event.target.closest('.card')
    const produtoId = card.dataset.id
    console.log(produtoId)

    fetch(`http://localhost:3000/produtos/${produtoId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(produtoId)
    })
   .then(pegarDados)
   .catch(erro => console.log(erro))

   pegarDados()
}