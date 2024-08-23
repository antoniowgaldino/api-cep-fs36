async function findEstados() {
    var url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados`
    console.log(url)

    await fetch(url)
        .then(response => response.json())
        .then(data => {
            data.sort((a, b) => (a.sigla > b.sigla) ? 1 : -1)

            let estados = ''
            data.sort().forEach(e => estados += `<option value=${e.sigla}>${e.sigla}</option>`);
            console.log(estados)

            let uf = document.getElementById('uf');
            uf.innerHTML = estados; 
        })
}

findEstados()

function findByCep(e) {
    //objeto que contém o botão
    console.log(e.value)
    //let cep = document.getElementById('cep').value
    let cep = e.value
    var url = `https://viacep.com.br/ws/${cep}/json/`
    // var url = `https://brasilapi.com.br/api/cep/v2/${cep}`
    console.log(url)

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            preencheInputsEndereco(data)
        })
}

const preencheInputsEndereco = async data => {
    console.log(data);

    if (data.uf) {
        await getCidades(data.uf)
    }

    let logradouro = document.getElementById('logradouro');
    let complemento = document.getElementById('complemento');
    let bairro = document.getElementById('bairro');
    let localidade = document.getElementById('localidade');
    let uf = document.getElementById('uf');

    logradouro.value = data.logradouro;
    complemento.value = data.complemento;
    bairro.value = data.bairro;
    localidade.value = data.localidade;
    uf.value = data.uf;

    document.getElementById('numero').focus();
    //console.log(document.getElementById('form'))
}

const getCidades = async uf => {
    await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/distritos`)
        .then(response => response.json())
        .then(data => {
            // ordenar pelo nome
            data.sort((a, b) => (a.nome > b.nome) ? 1 : -1)
            //preencheInputsEndereco(data)
            //console.log('cidades', data)
            
            let cidades = ''
            data.forEach(e => cidades += `<option value=${e.nome}>${e.nome}</option>`);
            console.log(cidades)

            let localidade = document.getElementById('localidade');
            localidade.innerHTML = cidades; 
        })
}