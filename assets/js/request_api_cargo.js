//Request de receitas (recebendo lista de receitas)
export { cargoListar, cargoById, cargoCadastrar, cargoAlterar, cargoDeletar };

//Listar todos
async function cargoListar() {
    return {
        data: listasReceitas,
        error: errosReceitas
    } = await useFetch(URL_BASE_API + "/cargos/listar");
}

// Buscar por ID
async function cargoById(id_cargo) {
    return {
        data: listasReceitas,
        error: errosReceitas
    } = await useFetch(URL_BASE_API + "/cargos/byId/" + id_cargo);
}

//Cadastrar

async function cargoCadastrar(corpo_request) {
    return { data: listasReceitas, error: errosReceitas } =
        await useFetch(URL_BASE_API + "/cargos/cadastrar", {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify(corpo_request)
        });
}

// Atualizar
async function cargoAlterar(id_cargo, corpo_request) {
    return { data: listasReceitas, error: errosReceitas } =
        await useFetch(URL_BASE_API + "/cargos/alterar/" + id_cargo, {
            headers: { "Content-Type": "application/json" },
            method: "PUT",
            body: JSON.stringify(corpo_request)
        });
}


// Deletar
async function cargoDeletar(id_cargo) {
    return { data: listasReceitas, error: errosReceitas } =
        await useFetch(URL_BASE_API + "/cargos/excluir/" + id_cargo, {
            headers: { "Content-Type": "application/json" },
            method: "DELETE"
        });
}