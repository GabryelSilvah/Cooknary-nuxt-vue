<template>

    <section class="container_topico">
        <h2 class="titulo_topico">Caldos</h2>

        <div class="container_btn_opcoes">
            <button id="btn_add_food" @click="abrirForm">
                <img src="public/icones/plus.png" alt="">
                Adicionar Food
            </button>
        </div>
    </section>

    <form class="search" method="post">
        <input type="text" name="" id="" placeholder="Pesquisar foods">
        <button type="submit">Pesquisar</button>
    </form>

    <section class="container_food">
        <div class="foods" v-if="listasReceitas" v-for="receita in listasReceitas.data" :key="receita.id_receita">
            <img src="public/image/lamen.jpg">
            <h2 class="titulo_food">{{ receita.nome_receita }}</h2>
            <div class="itens_food">
                <p>Data Publicação: </p>
                <p>{{ receita.data_criacao }}</p>
            </div>

            <div class="itens_food">
                <p>Categoria: </p>
                <p>{{ receita.categoria }}</p>
            </div>

            <div class="container_btn">
                <NuxtLink :to="{ path: `/descricao_food`, query: { id_receita: receita.id_receita } }"
                    class="btn_acoes_food">
                    <img src="public/icones/ver.png">
                    Ver
                </NuxtLink>
                <button class="btn_acoes_food" @click="abrirForm">
                    <img src="public/icones/editar.png">
                    Editar
                </button>
                <button id="btn_excluir" class="btn_acoes_food" @click="excluir_receita(receita.id_receita)">
                    <img src="public/icones/delete.png">
                    Excluir
                </button>
            </div>
        </div>
    </section>
    <FormFood id="form" :categorias="listasCategorias" :ingredientes="listasIngredientes" :medidas="listasMedidas" />
</template>


<style>
@import url("~/assets/css/food.css");
</style>


<script setup scoped lang="js">

const URL_BASE_API = "http://localhost:8081";

//Request de receitas (recebendo lista de receitas)
const {
    data: listasReceitas, //armazenando lista de receitas vindo da API (back-end)
    error: errosReceitas //Capturando erros da requisição
} = await useFetch(URL_BASE_API + "/receitas/listar");

async function excluir_receita(id_receita) {
    //Request de receitas (recebendo lista de receitas)
    const {
        data: receitaExcluida, //armazenando lista de receitas vindo da API (back-end)
        error: errosExcluirReceita //Capturando erros da requisição
    } = await useFetch(URL_BASE_API + "/receitas/excluir/" + id_receita, { method: "DELETE" });
}

//Request de categorias (recebendo lista de categorias de receitas)
const {
    data: listasCategorias, //armazenando lista de categoria vindo da API (back-end)
    error: errosCategorias //Capturando erros da requisição
} = await useFetch(URL_BASE_API + "/receitas/categoria/listar");

//Request de ingredientes (recebendo lista de categorias de receitas)
let {
    data: listasIngredientes, //armazenando lista de ingredientes vindo da API (back-end)
    error: errosIngredientes //Capturando erros da requisição
} = await useFetch(URL_BASE_API + "/ingredientes/listar");

listasIngredientes = {
    data: [
        {
            id_ingred: 1,
            nome: "Pimenta",
        },
        {
            id_ingred: 2,
            nome: "Sal",
        }

    ]
}

//Request de medidas (recebendo lista de categorias de receitas)
let {
    data: listasMedidas, //armazenando lista de medidas vindo da API (back-end)
    error: errosMedidas //Capturando erros da requisição
} = await useFetch(URL_BASE_API + "/receitas/medida/listar");


listasMedidas = {
    data: [
        {
            id_med: 1,
            nome_med: "1 colher",
        },
        {
            id_med: 2,
            nome_med: "10 ml",
        }

    ]
}


//Apresentar/exibir formulário de cadastro de receita
function abrirForm() {
    let form = document.querySelector("#form");
    form.setAttribute("style", "display:flex");
}


</script>