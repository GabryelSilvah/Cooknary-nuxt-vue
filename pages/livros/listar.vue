<template>
  <main>
    <Menu />

    <div class="container_btn_opcoes">
      <button id="btn_add_food" @click="abrirForm">
        <img src="../../assets/icones/plus.png" alt="">
        Novo Livro
      </button>
    </div>

    <FormLivro id="form" :lista-receitas="listaReceitas.data" />

    <section class="container_livros">

      <div class="livro" v-for="livro in listaLivros.data">

        <div class="container_img_livro">

          <div class="container_black">
            <NuxtLink :to="{ path: `./descricao`, query: { id_livro: livro.id_livro } }">
              <img src="../../assets/icones/ver.png" class="btn_livros">
            </NuxtLink>
            <img src="../../assets/icones/editar.png" class="btn_livros">
            <img src="../../assets/icones/delete.png" class="btn_livros" id="btn_excluir"
              @click="excluirLivro(livro.id_livro)">
          </div>
          <img src="../../assets/image/banner_livro.png" class="img_livro">
        </div>

        <!-- {{ livro.editor }} -->
        <h2 class="titulo_livro">{{ livro.titulo_livro }}</h2>
        <h3 class="nome_editor">Por: Marcos</h3>
      </div>


    </section>

  </main>
</template>


//Estilização, sendo importada da pasta assets, css
<style scoped>
@import url("~/assets/css/livros/listarLivros.css");
</style>


//Funcionalidades e consumo de rotas da APIs
<script setup scoped lang="js">
import { deletarLivros, listarLivros } from '~/common/api/livros_request';
import { listarReceitas } from '~/common/api/receitas_request';




const listaLivros = await listarLivros();

const listaReceitas = await listarReceitas();


function abrirForm() {
  //Exibindo formulário
  let form = document.querySelector("#form");
  form.setAttribute("style", "display:flex");
}

async function excluirLivro(id_livro) {

  const responseAPI = await deletarLivros(id_livro);

}

</script>
