<template>

    <section class="container_form">


        <form action="" method="post" class="form" @submit.prevent="pegarDadosForm">

            <div class="sections">

                <img src="public/icones/close.png" id="btn_close" @click="fecharForm">
                <h2 class="topico">Informações básicas</h2>

                <label for="">Nome da Receita:</label>
                <input type="text" v-model="nome_receita" name="nome_receita">

                <label for="">Categoria:</label>
                <select name="categoria" id="" v-model="categoria_receita">
                    <option :value="0">Selecione</option>
                    <option v-if="categorias" v-for="categoria in categorias.data" :key="categoria.id_cat"
                        :value="categoria.id_cat">
                        {{ categoria.nome_categoria }}</option>
                </select>

                <label for="">Modo de Preparo:</label>
                <textarea name="" id="" v-model="modo_preparo_receita"></textarea>

                <div v-for="ingredienteAdd in listaIngredientes">
                    <p>{{ ingredienteAdd }}</p>
                    <p></p>
                </div>

                <label for="">Ingredientes:</label>
                <div class="container_checkbox">
                    <div class="checkbox">

                        <select name="medida" id="" v-model="ingredientes_receita">
                            <option :value="0">Selecione</option>
                            <option v-if="ingredientes" v-for="ingrediente in ingredientes.data"
                                :value="ingredientes.id_ingred" :key="ingrediente.id_ingred">{{
                                    ingrediente.nome }}</option>
                        </select>

                        <select name="medida" id="" v-model="medidas_receita">
                            <option :value="0">Selecione</option>
                            <option v-if="medidas" v-for="medida in medidas.data" :value="medida" :key="medida.id_med">
                                {{
                                    medida.nome_med }}</option>
                        </select>
                    </div>
                </div>


                <button type="button" @click="addIngredienteNaLista">Add
                    Ingrediente</button>
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

//Inicializando variáveis que vão receber dados do formulário
const nome_receita = ref("");
const categoria_receita = ref("");
const modo_preparo_receita = ref("");
const ingredientes_receita = ref();
const medidas_receita = ref();


let listaIngredientes = [];
console.log(ingredientes_receita.value);

function addIngredienteNaLista() {
    listaIngredientes.push(ingredientes_receita.value);
    console.log(listaIngredientes);
}


function pegarDadosForm() {
    console.log(nome_receita.value);
    console.log(categoria_receita.value);
    console.log(modo_preparo_receita.value);
    console.log(ingredientes_receita.value);
    console.log(medidas_receita.value);
}
//Receber dados de quem usou o componente e adicionar no formulário atrvés do modelo abaixo
defineProps({
    categorias: Object,
    ingredientes: Object,
    medidas: Object
});



//Fechar formulário
function fecharForm() {
    let container_form = document.querySelector(".container_form");
    container_form.setAttribute("style", "display:none");
}

</script>

<style>
@import url("~/assets/css_components/form.css");
</style>