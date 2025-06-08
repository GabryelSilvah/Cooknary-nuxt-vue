//Request de receitas (recebendo lista de receitas)
export { ingredientesListar, ingredientesById, ingredientesCadastrar, ingredientesAlterar, ingredientesDeletar };

//Endereço padrão da API (Spring Boot)
const URL_BASE_API = "http://localhost:8081";


//Listar todos
async function ingredientesListar() {
    const {
        data: responseAPI,
        error: errosIngredientes
    } = await useFetch(URL_BASE_API + "/ingredientes/listar");

    return responseAPI;
}


// Buscar por ID
async function ingredientesById(id_ingredientes) {
    const {
        data: responseAPI,
        error: errosIngredientes
    } = await useFetch(URL_BASE_API + "/ingredientes/byId/" + id_ingredientes);

    return responseAPI;
}


//Cadastrar
async function ingredientesCadastrar(corpo_request) {
    const {
        data: responseAPI,
        error: errosIngredientes
    } =
        await useFetch(URL_BASE_API + "/ingredientes/cadastrar", {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify(corpo_request)
        });

    return responseAPI;
}


// Atualizar
async function ingredientesAlterar(id_ingredientes, corpo_request) {
    const { data: responseAPI, error: errosIngredientes } =
        await useFetch(URL_BASE_API + "/ingredientes/alterar/" + id_ingredientes, {
            headers: { "Content-Type": "application/json" },
            method: "PUT",
            body: JSON.stringify(corpo_request)
        });

    return responseAPI;
}


// Deletar
async function ingredientesDeletar(id_ingredientes) {
    const { data: responseAPI, error: errosIngredientes } =
        await useFetch(URL_BASE_API + "/ingredientes/excluir/" + id_ingredientes, {
            headers: { "Content-Type": "application/json" },
            method: "DELETE"
        });

    return responseAPI;
}