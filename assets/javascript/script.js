document.querySelector('.busca button').addEventListener('click', async (event) => {
    event.preventDefault();
    const input = document.querySelector('#searchInput');
    const cidade = input.value;
    if (cidade) {
        limparInfo();
        exibirAviso('Carregando...');

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=00976c7ca112dec021595ec3c930c828&lang=pt_br&units=metric`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === 200) {
            exibirInfo(data);
        } else {
            exibirAviso('Cidade não encontrada!');
        }
    } else {
        limparInfo();
        exibirAviso('Digite o nome de uma cidade!');
    }
});

function exibirInfo(data) {
    const resultado = document.querySelector('.resultado');
    resultado.querySelector('.titulo').innerText = `${data.name}, ${data.sys.country}`;
    resultado.querySelector('.tempInfo').innerHTML = `${data.main.temp.toFixed(1)} <sup>ºC</sup>`;
    resultado.querySelector('.ventoInfo').innerHTML = `${data.wind.speed.toFixed(2)} <span>km/h</span>`;

    const ventoPonto = resultado.querySelector('.ventoPonto');
    ventoPonto.style.transform = `rotate(${data.wind.deg}deg)`;

    resultado.classList.add('mostrar');
    document.querySelector('.aviso').innerHTML = '';
}

function exibirAviso(mensagem) {
    document.querySelector('.aviso').innerText = mensagem;
}

function limparInfo() {
    const resultado = document.querySelector('.resultado');
    resultado.classList.remove('mostrar');
    resultado.querySelector('.titulo').innerText = '';
    resultado.querySelector('.tempInfo').innerText = '';
    resultado.querySelector('.ventoInfo').innerText = '';
}