const cep = document.querySelector('#cep');
const numero = document.querySelector('#numero');

async function findEstados() {
    var url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados`
    console.log(url)

    await fetch(url)
        .then(response => response.json())
        .then(data => {
            data.sort((a, b) => (a.sigla > b.sigla) ? 1 : -1)

            let estados = ''
            data.sort().forEach(e => estados += `<option value=${e.sigla}>${e.sigla}</option>`);
            console.log(estados);

            let uf = document.getElementById('uf');
            uf.innerHTML = estados;
        })
}

const consultaCep = async () => {
    let cepValue = cep.value;
    console.log(cepValue);

    if (cepValue.length === 8) {
        try {
            const res = await axios.get(`https://brasilapi.com.br/api/cep/v2/${cepValue}`);
            console.log(res.data);

            preencherCampos(res.data);
            numero.focus();

        } catch (error) {
            console.error(error);
        }
    }
}

const preencherCampos = data => {
    // if (data.uf) {
    //     await getCidades(data.uf)
    // }

    const logradouro = document.getElementById('logradouro');
    const bairro = document.getElementById('bairro');
    const uf = document.getElementById('uf');

    logradouro.value = data.street;
    bairro.value = data.neighborhood;
    uf.value = data.uf;
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