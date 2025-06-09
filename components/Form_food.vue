<template>

    <section class="container_form">


        <form action="" method="post" class="form" @submit.prevent="pegarDadosForm">

            <div class="sections">
                <img src="public/icones/close.png" id="btn_close" @click="fecharForm">
                <h2 class="topico">Cadastrar Nova Receita</h2>


                <label for="">Nome da Receita:</label>
                <input type="text" v-model="nome_referencia_form" name="nome_referencia_form"
                    placeholder="Ex: Risoto de camarão" required>


                <label for="">Categoria:</label>
                <select required name="categoria" id="" v-model="categoria_referencia_form">
                    <option value="0">Selecione</option>
                    <option v-if="categorias" v-for="categoria in categorias.data" :key="categoria.id_cat"
                        :value="categoria.id_cat">
                        {{ categoria.nome_categoria }}
                    </option>
                </select>


                <label for="">Cozinheiro:</label>
                <select name="cozinheiro" id="" v-model="cozinheiro_referencia_form" required>
                    <option value="0">Selecione</option>
                    <option v-if="funcionarios" v-for="cozinheiro in funcionarios.data" :key="cozinheiro.id_func"
                        :value="cozinheiro.id">
                        {{ cozinheiro.nome }}
                    </option>
                </select>


                <label for="">Ingredientes:</label>
                <div class="container_itens_add" id="caixa_de_itens_salvas">
                    <p>Adicione ingredientes e suas medidas</p>
                </div>


                <div class="container_checkbox">
                    <div class="checkbox">

                        <!-- Selecionar ingrediente -->
                        <select name="ingrediente" v-model="ingredientes_referencia_form" required class="select_ingred">
                            <option value="0">Selecione</option>
                            <option v-if="ingredientes" v-for="ingrediente in ingredientes.data"
                                :key="ingrediente.id_ingred" :value="ingrediente.id_ingred">
                                {{ ingrediente.nome }}
                            </option>
                        </select>
                        

                        <input type="number" min="1" value="1" class="input_quantidade">
                        
                        
                        <!-- Selecionar medida -->
                        <select name="medida" id="" v-model="medida_referencia_form" required class="select_ingred">
                            <option value="0">Selecione</option>
                            <option v-if="medidas" v-for="medida in medidas.data" :key="medida.id_med"
                                :value="medida.id_med">
                                {{ medida.nome_med }}
                            </option>
                        </select>
                    </div>

                    <button type="button" @click="addIngredienteNaLista" class="btn_adicionar">
                        Adicionar
                    </button>
                </div>


                <label for="">Modo de Preparo:</label>
                <textarea name="" id="" v-model="modo_preparo_referencia_form" placeholder="Descreva o modo de preparo">
                </textarea>


                <button type="submit">Salvar</button>

            </div>


            <!--
                Funcionalidade para adicionar se ainda houver prazo

                <div class="sections">
                <h2 class="topico">Detalhes e valores nutricionais</h2>
                <label for="">Tempo de preparo:</label>
                <input type="text">

                <label for="">Tempo de cozimento:</label>
                <input type="text">

                <label for="">Calorias:</label>
                <input type="text">

                <label for="">Carboidratos:</label>
                <input type="text">


                <label for="">Proteínas:</label>
                <input type="text">

                <label for="">Gorduras:</label>
                <input type="text">


            </div>-->
        </form>

    </section>

</template>

<script setup scoped lang="js">
import { ref } from 'vue';


const URL_BASE_API = "http://localhost:8081";


//Definindo os dados dos campos selecet que devem ser passado por quem usar o componente Form_food
defineProps({
    categorias: Object,
    ingredientes: Object,
    medidas: Object,
    funcionarios: Object,
    dadosCadastrados: Object
});


//Inicializando variáveis que vão receber dados do formulário
const nome_referencia_form = ref("");
const categoria_referencia_form = ref(0);
const cozinheiro_referencia_form = ref(0);
const modo_preparo_referencia_form = ref("");
const ingredientes_referencia_form = ref(0);
const medida_referencia_form = ref(0);




//Formato de dados para envio de cadastro da receita
//Será usado para adicionar os dados vindo do formulário
//Posteriomente, enviar esses dados na requisição para API
let receitaModel = {
    nomeReceita: "",
    data_criacao: "",
    categoria_id: { id_cat: 0 },
    cozinheiro_id: { id_func: 0 },
    modo_preparo: "",
    ingredientes_id: []
}


//Função que é chamda toda vez que um novo ingrediente é adicionado no formulário
//Ela pega o ingrediente e medida e adiciona no obejeto ingredientesModel
//Posteriomente, pegar esse objeto (ingredientesModel) e adiciona no objeto receitaModel, dentro do array de ingredientes_id
async function addIngredienteNaLista() {

    //Criando o formato de ingredientes separado de receita porque será uma lista de ingredientes
    //Posteriomente, essa lista de ingredientes é adicionada na receitaModel
    let ingredientesModel = {
        medida_id: { id_med: 0 },
        ingrediente_id: { id_ingred: 0 }
    }


    ingredientesModel.ingrediente_id.id_ingred = ingredientes_referencia_form.value;
    ingredientesModel.medida_id.id_med = medida_referencia_form.value;


    //Adicionando ingredientes em receitaModel
    receitaModel.ingredientes_id.push(ingredientesModel);

    exibir_ingrediente_add();

}


//Função que recebe os dados após o envio dos dados do formulario e adiciona no objeto receitaModel
//com exerção do do campo ingrediente porque já foi pego pela função addIngredienteNaLista()
async function pegarDadosForm() {
    receitaModel.nomeReceita = nome_referencia_form.value;
    receitaModel.data_criacao = "2025-05-03";
    receitaModel.categoria_id.id_cat = categoria_referencia_form.value;
    receitaModel.cozinheiro_id.id_func = cozinheiro_referencia_form.value;
    receitaModel.modo_preparo = modo_preparo_referencia_form.value;



    //Enviando dados para API
    const {
        data: ResponseAPI,
        error: errosCadastro
    } = await useFetch(URL_BASE_API + "/receitas/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(receitaModel)
    });

    console.log(JSON.stringify(receitaModel));
    console.log(ResponseAPI);

    fecharForm();
}


//Fechar formulário
function fecharForm() {
    let container_form = document.querySelector(".container_form");
    container_form.setAttribute("style", "display:none");
}


//Função para exibir uma lista de cada ingrediente que está sendo adicionado 
async function exibir_ingrediente_add() {

    //Request de ingredientes (recebendo ingrediente procurado pelo ID)
    let {
        data: medidaEncontrada, //armazenando lista de medida vindo da API (back-end)
        error: errosMedida //Capturando erros da requisição
    } = await useFetch(URL_BASE_API + "/receitas/medida/byId/" + medida_referencia_form.value);


    //Request de ingredientes (recebendo ingrediente procurado pelo ID)
    let {
        data: ingredienteEncontrado, //armazenando lista de ingredientes vindo da API (back-end)
        error: errosIngredientes //Capturando erros da requisição
    } = await useFetch(URL_BASE_API + "/ingredientes/byId/" + ingredientes_referencia_form.value);


    //Exibir no formulário caixa com lista de ingredientes adicionados para cadastro
    let caixa_de_itens_salvas = document.getElementById("caixa_de_itens_salvas");
    let ingredAdd = document.createElement("p");
    ingredAdd.textContent = ingredienteEncontrado.value.data.nome;


    let medidaAdd = document.createElement("p");
    medidaAdd.textContent = medidaEncontrada.value.data.nome_med;


    let div = document.createElement("div");
    div.classList.add("container_composicao");

    div.appendChild(ingredAdd);
    div.appendChild(medidaAdd);

    caixa_de_itens_salvas.insertAdjacentElement("beforeend", div);
}

</script>

<style scoped>
@import url("~/assets/css_components/form.css");
</style>