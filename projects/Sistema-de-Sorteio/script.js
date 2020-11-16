// Habilitar e desabilitar o input semente.
campoSemente = document.sorteio.semente;
checkSemente = document.sorteio.sementeManual;
checkSemente.onclick = function () {
	campoSemente.disabled = !checkSemente.checked;
}

// Evento de execução do sorteio ao clicar no botão "Gerar Lista".
botao = document.sorteio.button;
botao.onclick = testaRegras;

// Função que checa se os campos obrigatórios estão preenchidos e regras de validação foram obedecidas.
function testaRegras() {
	let nomeCurso = document.sorteio.nomeCurso.value;
	let inscritos = parseInt(document.sorteio.totalInscritos.value);
	let vagas = parseInt(document.sorteio.vagas.value);
	if (nomeCurso == "" || inscritos == "" || vagas == "") { // Testa se todos os campos foram preenchidos
		alert("Preencha todos os campos indicados!");
	} else if (inscritos <= "0" || vagas <= "0") { // Testa se o número de vagas e de inscritos é menor ou igual a zero
		alert("A quantidade de inscritos e de vagas disponíveis não pode ser menor ou igual a 0.");
	} else if (inscritos < vagas) { // Testa se o Número de inscritos é menor que o número de vagas
		alert("A quantidade de inscritos não pode ser menor que a quantidade de vagas disponíveis.");
	} else gereEImprimaResultado(nomeCurso, inscritos, vagas); // Se estuver tudo certo com os dados de entrada, chama a função principal.
}

// Função principal do sistema. Chama as outras funções.
function gereEImprimaResultado(nomeCurso, inscritos, vagas) {
	let semente; // Instanciando a variável semente.
	if (document.sorteio.sementeManual.checked) {
		semente = parseInt(document.sorteio.semente.value); // Semente indicada pelo usuário. Para fins de auditoria.
	} else {
		semente = new Date().getTime(); // Gera uma semente aleatória que é Um número representando os milissegundos passados entre 1 de Janeiro de 1970 00:00:00 UTC e a data atual.
	}
	let embaralhada = gereListaEmbaralhada(inscritos, semente); // Atribui a lista embaralhada a uma variável
	let pontoImpressao = document.getElementById('resultado'); // Onde irá imprimir o resultado
	let pontoInformacao = document.getElementById('informacao'); // Onde irá imprimir as informações do sistema
	imprimaResultado(nomeCurso, semente, embaralhada, vagas, pontoImpressao);
	gereVisualDeInformacoesTecnicas(semente, pontoInformacao);
}

// Função que embaralha os inscritos com base na semente utilizada, seja a aleatória ou a inserida manualmente. Utiliza uma abordagem do algoritmo de embaralhamento Fisher–Yates.
function gereListaEmbaralhada(inscritos, semente) {
	Math.seedrandom(semente);
	let consumida = new Array(inscritos); // Cria array vazio com a quantidade especificada de inscritos.
	let resultado = new Array(inscritos); // Cria array vazio com a quantidade especificada de inscritos.
	for (let i = 0; i < inscritos; i++) {
		consumida[i] = 1 + i; // Preenche o array 'consumida' com uma sequência de 1 até o valor máximo que é a quantidade de inscritos.
		resultado[i] = 0; // Preenche o array 'resultado' com 0.
	}
	for (let i = 0; i < inscritos; i++) {
		let aleatorio = Math.floor(Math.random() * inscritos); // Gera um número pseudoaleatório entre 0 e o número de inscritos.
		while (consumida[aleatorio] == 0) { 
			aleatorio = (1 + aleatorio) % inscritos; // Testa se a posição já foi consumida.
		}
		resultado[i] = consumida[aleatorio]; // Atribui ao array 'resultado' o valor aleatório. selecionado no array 'consumida'.
		consumida[aleatorio] = 0; // Consome uma posição do array consumida igualando a posição a 0.
	}
	return resultado;
}
// Conjunto de funções que exibem os resultados do sorteio e as informações técnicas do sistema no arquivo index.html.
function imprimaResultado(nomeCurso, semente, embaralhada, vagas, pontoImpressao) {
	let resultadoSorteio = "";
	resultadoSorteio += gereVisualDeCabecalhoDaLista(nomeCurso, semente);
	resultadoSorteio += gereVisualDeListaDeSelecionados(embaralhada, vagas);
	resultadoSorteio += gereVisualDeListaDeEspera(embaralhada, vagas);
	pontoImpressao.innerHTML = resultadoSorteio;
}
function gereVisualDeCabecalhoDaLista(nomeCurso, semente) {
	let data = new Date();
	let conteudoCabecalho = `
	<div class="alert alert-success" role="alert">
		<strong>Horário do sorteio: </strong>${data}
	</div>
	<div class="alert alert-info" role="alert">
		<strong>Semente utilizada no sorteio: </strong>${semente}<br/>
		<p>A semente aleatória gerada é um número representando os milissegundos passados entre 1 de Janeiro de 1970 00:00:00 UTC e a data atual.</p>
	</div>
    <h1 class="text-center">Lista <b>OFICIAL</b> do sorteio: ${nomeCurso}</h1>
    `
	return conteudoCabecalho;
}
function gereVisualDeListaDeSelecionados(lista, ultimaPosicao) {
	let conteudoListaDeSelecionados = `
        <h2 class="mx-auto mt-3">Primeira chamada</h2>
        <table class="table table-hover" id="tabelaSelecionados">
        <thead class="thead-dark">
        <tr>
        <th scope="col">Número</th>
        <th scope="col">Colocação</th>
        </tr>
        </thead>
        <tbody>
    `;
	for (let i = 0; i < ultimaPosicao; i++) {
		conteudoListaDeSelecionados += "<tr><td>" + lista[i] + "</td><td>" + (parseInt(i) + 1) + "°</td></tr>";
		if (i == ultimaPosicao - 1) {
			conteudoListaDeSelecionados += "</tbody></table>";
		}
	}
	return conteudoListaDeSelecionados;
}
function gereVisualDeListaDeEspera(lista, ultimaPosicao) {
	let conteudoListaDeEspera = `
    <h2 class="mx-auto mt-3">Lista de espera</h2>
    <table class="table table-hover" id="tabelaListaEspera">
    <thead class="thead-dark">
    <tr>
    <th scope="col">Número</th>
    <th scope="col">Colocação</th>
    </tr>
    </thead>
    <tbody>
    `;
	for (let i = ultimaPosicao; i < lista.length; i++) {
		conteudoListaDeEspera += "<tr><td>" + lista[i] + "</td><td>" + (parseInt(i) + 1) + "°</td></tr>";
		if (i == lista.length) {
			conteudoListaDeEspera += "</tbody></table>";
		}
	}
	return conteudoListaDeEspera;
}
function gereVisualDeInformacoesTecnicas(semente, pontoInformacao) {
	let conteudoInformacaoesTecnicas =
	`
    <h3>Informações técnicas do sistema e do software</h3>
	<b>platform:</b> ${navigator.platform}<br/>
	<b>appName:</b> ${navigator.appName}<br/>
	<b>appVersion:</b> ${navigator.appVersion}<br/>
	<b>userAgent:</b> ${navigator.userAgent}<br/>
	<b>Versão deste sistema:</b> 07/2020<br/>
	<b>Semente utilizada para o sorteio:</b> ${semente}<br/>
	<b>Biblioteca utilizada para semente de randomicidade</b>: https://github.com/davidbau/seedrandom | Copyright 2019 David Bau.<br/>
	<b>VERSÃO BASEADA NO SOFTWARE DISPONIBILIZADO PELO INSTITUTO FEDERAL DE SANTA CATARINA (IFSC)</b> <br/>
	<b>Copyright IFSC https://www.ifsc.edu.br/sorteio-publico</b><br/>
	<b>Autores:</b> Antonielly Garcia Rodrigues, Alex Helder Cordeiro de Oliveira
	<b>Nova versão:</b> Isaac D'Césares | 07/2020
	`
	pontoInformacao.innerHTML = conteudoInformacaoesTecnicas;
}