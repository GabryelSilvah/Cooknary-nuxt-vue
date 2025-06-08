export { categoriaListar, categoriaById, categoriaCadastrar, categoriaAlterar, categoriaDeletar };

//Endereço padrão da API (Spring Boot)
const URL_BASE_API = "http://localhost:8081";


//Listar todos
async function categoriaListar() {
    const {
        data: responseAPI,
        error: errosCategoria
    } = await useFetch(URL_BASE_API + "/receitas/categoria/listar");

    return responseAPI;
}


// Buscar por ID
async function categoriaById(id_categoria) {
    const {
        data: responseAPI,
        error: errosCategoria
    } = await useFetch(URL_BASE_API + "/receitas/categoria/byId/" + id_categoria);

    return responseAPI;
}


//Cadastrar
async function categoriaCadastrar(corpo_request) {
    const {
        data: responseAPI,
        error: errosCategoria
    } =
        await useFetch(URL_BASE_API + "/receitas/categoria/cadastrar", {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify(corpo_request)
        });

    return responseAPI;
}


// Atualizar
async function categoriaAlterar(id_categoria, corpo_request) {
    const { data: responseAPI, error: errosCategoria } =
        await useFetch(URL_BASE_API + "/receitas/categoria/alterar/" + id_categoria, {
            headers: { "Content-Type": "application/json" },
            method: "PUT",
            body: JSON.stringify(corpo_request)
        });

    return responseAPI;
}


// Deletar
async function categoriaDeletar(id_categoria) {
    const { data: responseAPI, error: errosCategoria } =
        await useFetch(URL_BASE_API + "/receitas/categoria/excluir/" + id_categoria, {
            headers: { "Content-Type": "application/json" },
            method: "DELETE"
        });

    return responseAPI;
}