const cep = document.querySelector('#cep');

const consultaCep = async () => {
    let cepValue = cep.value;
    console.log(cepValue);

    if (cepValue.lenght === 8) {
        try {
            const response =
                await axios.get(`https://brasilapi.com.br/api/cep/v2/${cepValue}`);
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }
}