let animacao, efeitos, musicas, volum_efsn, volum_mus, config

// function que captura as confgurações ja feitas e poe formatada no localstorage
function permitirConfig() {
	animacao = document.getElementById('o-ani').className
	animacao.includes('on') ? animacao = 1 : animacao = 0

	efeitos = document.getElementById('o-efeitos').className
	efeitos.includes('on') ? efeitos = 1 : efeitos = 0

	musicas = document.getElementById('o-musicas').className
	musicas.includes('on') ? musicas = 1 : musicas = 0

	if(volum_efsn == undefined) {
		volum_efsn = document.getElementById('vol-efsn').value / 100
	}

	if(volum_mus == undefined) {
		volum_mus = document.getElementById('vol-mus').value / 100
	}

	config = `${animacao}${efeitos}${musicas}/${volum_efsn}/${volum_mus}`
	localStorage.setItem('conjnave2123', config)
	window.location.reload()
}

// caso a permição de salvar configurações seja concedida
if(localStorage.getItem('conjnave2123') != null) {
	// acessando localstorage
	config = localStorage.getItem('conjnave2123')

	// seprarando valores 
	animacao = parseInt(config.slice(0, 1))
	efeitos = parseInt(config.slice(1, 2))
	musicas = parseInt(config.slice(2, 3))

	// tratativa para seperar valores dos volumes
	let b1_n = config.indexOf('/') + 1
	let aux_volums = config.slice(b1_n, config.lenght)
	let b2_n = aux_volums.indexOf('/')

	// definindo os volumes
	volum_efsn = parseFloat(aux_volums.slice(0, b2_n))
	volum_mus = parseFloat(aux_volums.slice((b2_n + 1), aux_volums.length))

} else {
	// valores defaut para quando chegar no proximo script configurar os valores
	animacao = 1
	efeitos = 1
	musicas = 1
	volum_efsn = 0.03
	volum_mus = 0.06
}





