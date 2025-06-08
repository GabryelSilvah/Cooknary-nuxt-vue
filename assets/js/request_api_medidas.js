//Request de receitas (recebendo lista de receitas)
export { medidasListar, medidasById, medidasCadastrar, medidasAlterar, medidasDeletar };

//Endereço padrão da API (Spring Boot)
const URL_BASE_API = "http://localhost:8081";


//Listar todos
async function medidasListar() {
    const {
        data: responseAPI,
        error: errorsMedidas
    } = await useFetch(URL_BASE_API + "/receitas/medida/listar");

    return responseAPI;
}


// Buscar por ID
async function medidasById(id_medidas) {
    const {
        data: responseAPI,
        error: errorsMedidas
    } = await useFetch(URL_BASE_API + "/receitas/medida/byId/" + id_medidas);

    return responseAPI;
}


//Cadastrar
async function medidasCadastrar(corpo_request) {
    const {
        data: responseAPI,
        error: errorsMedidas
    } =
        await useFetch(URL_BASE_API + "/receitas/medida/cadastrar", {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify(corpo_request)
        });

    return responseAPI;
}


// Atualizar
async function medidasAlterar(id_medidas, corpo_request) {
    const { data: responseAPI, error: errorsMedidas } =
        await useFetch(URL_BASE_API + "/receitas/medida/alterar/" + id_medidas, {
            headers: { "Content-Type": "application/json" },
            method: "PUT",
            body: JSON.stringify(corpo_request)
        });

    return responseAPI;
}


// Deletar
async function medidasDeletar(id_medidas) {
    const { data: responseAPI, error: errorsMedidas } =
        await useFetch(URL_BASE_API + "/receitas/medida/excluir/" + id_medidas, {
            headers: { "Content-Type": "application/json" },
            method: "DELETE"
        });

    return responseAPI;
}