<template>

    <section class="banner_page">
        <img src="public/image/banner_page.png" alt="">
        <h1 class="name_page">Asian Food</h1>
    </section>
    
    <h2 class="topico_section">Foods Recentes</h2>  
    <section class="foods_recentes">

        <div class="foods">
            <img src="public/image/lamen.jpg">
            <h2 class="titulo_food" th:text="${titulo_food}">Nome da comida</h2>
            <div class="itens_food">
                <p>Descrição: </p>
                <p>Macarrão, ovo, carne...</p>
            </div>

            <div class="itens_food">
                <p>Categoria: </p>
                <p>Típicas</p>
            </div>

            <div class="itens_food pais_food">
                <p>País: </p>
                <p>Japão</p>
                <img src="public/bandeiras/japan.png">
            </div>
            <div class="container_btn">
                <a href="descricao_food" class="btn_acoes_food">
                    <img src="public/icones/ver.png">
                    Ver
                </a>
            </div>
        </div>
    </section>


</template>

<style>
.topico_section{
    width: 90vw;
    font-size: 2rem;
    margin-top: 50px;
    background-color: #1b1b1b;
    color: #fff;
    box-shadow: 2px 2px 20px rgb(198, 198, 198);
    padding: 10px 20px;
    border-radius: 6px;
}
.banner_page {
    width: 100vw;
    height: 300px;
    position: relative;
}

.banner_page img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.banner_page .name_page {
    position: absolute;
    top: 100px;
    left: 50px;
    background-color: #141414;
    color: #fff;
    border-radius: 10px;
    padding: 5px;
    font-size: 4rem;
}

/*  */


.foods_recentes {
    max-width: 90vw;
    position: relative;
    margin: 50px 20px;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    gap: 30px;
}

.foods_recentes .foods {
    width: 456px;
    height: 464px;
    border-radius: 15px;
    box-shadow: 2px 2px 20px rgb(207, 207, 207);
    overflow: hidden;
    cursor: pointer;
}

.foods_recentes .foods img {
    width: 100%;
    height: 50%;
    object-fit: cover;
}

.foods_recentes .foods .itens_food {
    height: 20px;
    margin: 10px 20px;
    display: flex;
    gap: 10px;
    overflow: hidden;
}

.foods_recentes .foods .titulo_food {
    margin-top: 20px;
    font-family: sans-serif;
    font-size: 1.5rem;
    text-align: start;
    margin-left: 20px;
}

.foods_recentes .foods .container_categorias {
    display: flex;
    gap: 10px;
    margin: 10px 20px;
}

.foods_recentes .foods .pais_food img {
    width: 20px;
    height: 20px;
    object-fit: cover;
}

.foods_recentes .foods .container_btn {
    margin: 0 20px;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.foods_recentes .foods .container_btn .btn_acoes_food {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10%;
    text-align: center;
    margin: 20px;
    width: 100px;
    height: 40px;
    border: none;
    border-radius: 10px;
    background-color: rgb(228, 228, 228);
    color: #000;
    font-size: 1rem;
    cursor: pointer;
    text-decoration: none;
    transition: 0.7s;
}

.foods_recentes .foods .container_btn .btn_acoes_food:hover {
    background-color: #ffbf00;
}

.foods_recentes .foods .container_btn .btn_acoes_food img {
    width: 20px;
    height: 20px;
    object-fit: cover;
}

.foods_recentes .foods .container_btn #btn_excluir {
    background-color: rgb(250, 47, 11);
    color: #fff;
}
</style>