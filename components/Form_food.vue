<template>

    <section class="container_form">


        <form action="" method="post" class="form">

            <div class="sections">
                <img src="public/icones/close.png" id="btn_close" @click="fecharForm">
                <h2 class="topico">Informações básicas</h2>
                <label for="">Nome da Receita:</label>
                <input type="text" required>
                <label for="">Categoria:</label>
                <select name="categoria" id="">
                    <option value="0">Selecione</option>
                    <option v-for="categoria in categorias.data" :key="categoria.id_cat" value="{{ categoria.id_cat }}">
                        {{ categoria.nome_categoria }}</option>
                </select>
                <label for="">Modo de Preparo:</label>
                <textarea name="" id=""></textarea>
                <label for="">Ingredientes:</label>
                <div class="container_checkbox">
                    <div class="checkbox" v-for="ingrediente in ingredientes.data" :key="ingrediente.id_ingred">
                        <input type="checkbox" class="square_check">
                        <label for="">{{ ingrediente.nome }}</label>
                        <select name="medida" id="">
                            <option value="0">Selecione</option>
                            <option value="{{ medida.id_med }}" v-for="medida in medidas.data" :key="medida.id_med">{{
                                medida.nome_med }}</option>
                        </select>
                    </div>
                </div>
                
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