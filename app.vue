<template>

  <header class="menu">
    <nav>

      <div class="Marca">
        <h2>Cooknary</h2>
      </div>
      <ul>
        <NuxtLink to="/home"><li>Home</li></NuxtLink>
        <NuxtLink to="/food"><li>Receitas</li></NuxtLink>
        <NuxtLink to="/food"><li>Funcionários</li></NuxtLink>
        <NuxtLink to="/food"><li>Perfil</li></NuxtLink>
        <NuxtLink to="/food"><li>Sair</li></NuxtLink>
      </ul>
    </nav>
  </header>

  <main>
    <NuxtPage />
  </main>

  <footer>

  </footer>


</template>

<script>
import { NuxtLink } from '#components';



</script>



<style>
@import url("~/assets/css/menu.css");

main{
  margin-bottom: 50px;
}
</style>