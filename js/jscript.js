let diry, dirx, jogando, frames, jogador, jogx, jogy
let vel_J, vel_T, vel_B
let qtd_bombas, bombas_total, intv_cria
let vida_planeta, pnt_perda, bmb_perda, barra_bomb_w, cont_derrot, frames_derrota, opacity_derr
let id_ttl_tiro, id_ttl_bomba, idt_cont, idb_cont
let idt_t, idb_b
let vitoria, derrota
let interval_tiro, time_tiro

/* quando o body carrega ele executa a function para configurar 
visualmente a janela de configurações */
function configurar() {
	if(localStorage.getItem('conjnave2123') != null) {
		document.getElementById('permissao').style.display = 'none'
	}

	let efsn = document.getElementById('vol-efsn')
	let mus = document.getElementById('vol-mus')

	efsn.value = volum_efsn * 100
	mus.value = volum_mus * 100

	let o_ani = document.getElementById('o-ani').className
	if(animacao == 0) {
		document.getElementById('o-ani').className = o_ani.replace('on', 'off') 
	}

	// -- //
	let o_efeitos = document.getElementById('o-efeitos').className
	if(efeitos == 0) {
		efsn.setAttribute('disabled', 'disabled')
		document.getElementById('o-efeitos').className = o_efeitos.replace('on', 'off')
		efsn.style.opacity = 0.6
	}

	// -- //
	let o_musicas = document.getElementById('o-musicas').className
	if(musicas == 0) {
		mus.setAttribute('disabled', 'disabled')
		document.getElementById('o-musicas').className = o_musicas.replace('on', 'off')
		mus.style.opacity = 0.6
	}
}

// function para configuração da animação das estrelas
function configAnimacao() {
	let o_ani = document.getElementById('o-ani').className

	if(animacao == 1) {
		document.getElementById('o-ani').className = o_ani.replace('on', 'off')
		animacao = 0
	} else {
		document.getElementById('o-ani').className = o_ani.replace('off', 'on')
		animacao = 1
	}

	atualizarConfig()
}

// function para configuração dos efeitos sonoros
function configEfeitos() {
	efeitos = configVolumes('o-efeitos', 'vol-efsn', efeitos)
	atualizarConfig()
}

// function para configuração das musicas
function configMusc() {
	musicas = configVolumes('o-musicas', 'vol-mus', musicas)
	atualizarConfig()
}

/* function para alteraão dos valores das variaveis de volume e aspectos 
visuais dos itens correspondentes */
// usada dentro de configEfeitos() e configMusc() 
function configVolumes(botao_id, entrada_id, variavel) {
	let botao = document.getElementById(botao_id).className
	let entrada = document.getElementById(entrada_id)
	let valor_retorno

	if(variavel == 1) {
		document.getElementById(botao_id).className = botao.replace('on', 'off')
		entrada.setAttribute('disabled', 'disabled')
		entrada.style.opacity = 0.6
		valor_retorno = 0
	} else {
		document.getElementById(botao_id).className = botao.replace('off', 'on')
		entrada.removeAttribute('disabled')
		entrada.style.opacity = 1
		valor_retorno = 1
	}

	return valor_retorno
}

// function para configuração do volume dos efeitos sonoros
function capturarVolumeEfsn() {
	document.getElementById('vol-efsn').onmouseup = function() {
		volum_efsn = document.getElementById('vol-efsn').value / 100
		atualizarConfig()
	}
}

// function para configuração do volume das musicas
function capturarVolumeMus() {
	document.getElementById('vol-mus').onmouseup = function() {
		volum_mus = document.getElementById('vol-mus').value / 100
		atualizarConfig()
	}
}

// function para setar no localstorage as novas configurações
// esta sendo usado nas functions de configurações
function atualizarConfig() {
	if(localStorage.getItem('conjnave2123') != null) {
		config = `${animacao}${efeitos}${musicas}/${volum_efsn}/${volum_mus}`
		localStorage.setItem('conjnave2123', config)
	}
}

function abrirJanela(id_janela) {
	let geral = document.getElementById('janelas-gerais')
	geral.style.display = 'flex'

	let janela = document.getElementById(id_janela)
	janela.className = janela.className.replace(' d-none', '')
}

function fecharJanelas(nome_id) {
	let geral = document.getElementById('janelas-gerais')
	geral.style.display = 'none'

	let janela = document.getElementById(nome_id)
	janela.className += ' d-none'
}

function botaoIniciar() {

	let tela_ini = document.getElementById('tela-inicial-aux')
	let btns_ini = document.getElementById('btns-ini')
	let tela_jogo = document.getElementById('tela-jogo')
	let btns_jogo = document.getElementById('btns-jogo')

	tela_ini.style.animationName = 'ani-tela-ini'
	btns_ini.style.animationName = 'ani-btns-ini'

	setTimeout(function() {
		document.getElementById('container-inicial').className = 'd-none'
		document.getElementById('container-jogo').className = ''
		tela_jogo.style.animationName = 'ani-tela-jogo'
		btns_jogo.style.animationName = 'ani-btns-jogo'

		// -- //
		setTimeout(function() {
			tela_jogo.style.top = '0'
			btns_jogo.style.bottom = '0'

			volum = 0.02

			if(musicas == 1) {
				document.getElementById('audio-jogo').play()
				document.getElementById('audio-jogo').volume = volum_mus
			}

			document.getElementById('contagem').innerHTML = '1'

			// -- //
			setTimeout(function() {
				document.getElementById('contagem').innerHTML = '2'

				// -- //
				setTimeout(function() {
					document.getElementById('contagem').innerHTML = '3'

					// -- //
					setTimeout(function() {
						document.getElementById('contagem').style.display = 'none'
						jogando = true
						iniciarJogo()
					}, 1000)
				}, 1000)
			}, 1000)
		}, 1000)
	}, 400)
}

function reiniciarJogo() {
	document.getElementById('nave').style.left = '225px'
	document.getElementById('nave').style.top = '400px'

	document.getElementById('btn-reset').setAttribute('disabled', 'disabled')

	let texto = document.getElementById('text-reslt')
	texto.innerHTML = ''
	texto.style.opacity = 0
	texto.style.color = ''

	let planeta = document.getElementById('planeta-reslt')
	planeta.style.transition = '4s'
	
	let jogo = document.getElementById('jogo')
	let barras = document.getElementById('barras')
	jogo.style.opacity = 1
	barras.style.opacity = 1

	document.getElementById('barra-vida').style.width = '200px'
	document.getElementById('barra-bomba').style.width = '200px'

	if(vitoria) {
		if(musicas == 1) document.getElementById('audio-vit').pause()

	} else if(derrota) {
		let brilho_derr = document.getElementById('brilho_derr')
		brilho_derr.innerHTML = ''
		brilho_derr.style.opacity = 1
		cont_derrot = 1

		document.getElementById('tela-jogo').style.background = 'linear-gradient(145deg, #1F2034, #0A0B15)'
		
		if(musicas == 1) document.getElementById('audio-derr').pause()

	} else {
		if(musicas == 1) document.getElementById('audio-jogo').pause()

		jogo.className = 'd-none'
		barras.className += ' d-none'
		document.getElementById('tiro').innerHTML = ''
		document.getElementById('bomba').innerHTML = ''
	}

	jogando = false
	frames = undefined

	let time_out = 500
	let crono = document.getElementById('cronometro')
	crono.style.animationName = 'crono1'

	setTimeout(function() {
		if(vitoria) planeta.style.backgroundPosition = '0px 500px'
		else if(derrota) {
			planeta.style.background = 'url(img/planeta-vit.png) no-repeat'
			planeta.style.backgroundSize = '500px 500px'
			planeta.style.backgroundPosition = '0px 500px'
		}
		
		crono.className = ''

		// -- //
		setTimeout(function() {
			crono.style.animationPlayState = 'running'
			if(efeitos == 1) {
				let audio_crono = document.getElementById('audio-crono')
				audio_crono.volume = volum_efsn
				audio_crono.currentTime = 0
				audio_crono.play()
			}
			
			// -- //
			setTimeout(function() {
				crono.style.opacity = 1
				document.getElementById('pt-min').style.animationPlayState = 'running'
				document.getElementById('pt-hr').style.animationPlayState = 'running'
				vitoria = derrota = ''

				// -- //
				setTimeout(function() {
					crono.style.animationName = 'crono2'
					crono.style.animationPlayState = 'running'

					// -- //
					setTimeout(function() {
						crono.style.animationPlayState = 'paused'
						crono.style.opacity = 0
						document.getElementById('tela-reslt').className = 'd-none'
						document.getElementById('cronometro').className = 'd-none'
						jogo.className = ''
						barras.className = 'camada'
						jogando = true
						jogo.style.transition = '0s'
						barras.style.transition = '0s'

						if(musicas == 1) {
							document.getElementById('audio-jogo').currentTime = 3.5
							document.getElementById('audio-jogo').play()
						}

						iniciarJogo()
					}, 500)
				}, 4000)
			}, 500)
		}, 500)
	}, 500)
}

/* function que seta os valores defaut das variaveis 
e elementos visuais e chama a function loopJogo() */
// esta sendo usada nas functions de botaoIniciar() e reiniciarJogo()
function iniciarJogo() {
	id_ttl_tiro = 1
	id_ttl_bomba = 1

	jogador = document.getElementById('nave')

	dirx = diry = 0

	vel_T = 5
	vel_J = 4
	vel_B = 3

	jogx = 225
	jogy = 400

	clearInterval(intv_cria)
	clearInterval(interval_tiro)

	vida_planeta = 200
	barra_bomb_w = 200
	bmb_totais = 80
	bmb_perda = barra_bomb_w / bmb_totais

	qtd_bombas = bmb_totais 

	// % das bombas explodem o planeta
	auxa = (qtd_bombas*15)/100
	pnt_perda = vida_planeta / auxa
	intv_cria = setInterval(criarBomba, 800)

	time_tiro = 1
	interval_tiro = setInterval(function() { time_tiro = 1 }, 200)

	idt_cont = 0
	idb_cont = 0
	cont_derrot = 1
	opacity_derr = 0.8

	idt_t = 1
	idb_b = 1

	derrota = false
	vitoria = false

	if(animacao == 1) {
		document.getElementById('back-jogo').style.animationPlayState = 'running'
	}

	document.getElementById('btn-reset').removeAttribute('disabled')
	loopJogo()
}

// function responsavel por todo andamento do jogo
// esta function ira se repitir até que as condições de parada sejam atendidas
function loopJogo() {
	if(vitoria == false && derrota == false) {
		if(jogando) {
			controleJogador()
			controleTiro()
			controleBomba()
			acertoTiroBomba()

			if(qtd_bombas == 0 && vida_planeta > 0) { // vitoria
				vitoria = true
				jogando = false
			} else if(vida_planeta == 0) { // derrota
				derrota = true
				jogando = false
			}

			frames = requestAnimationFrame(loopJogo)
		}

	} else {
		document.getElementById('tiro').innerHTML = ''
		document.getElementById('bomba').innerHTML = ''
		
		let jogo = document.getElementById('jogo')
		let barras = document.getElementById('barras')

		document.getElementById('tela-reslt').className = ''

		jogo.style.transition = '2s'
		barras.style.transition = '2s'
		jogo.style.opacity = 0
		barras.style.opacity = 0

		let planeta = document.getElementById('planeta-reslt')
		planeta.style.background = 'url(img/planeta-vit.png) no-repeat'
		planeta.style.backgroundSize = '500px 500px'
		planeta.style.backgroundPosition = '0px 500px'
		planeta.style.transition = '4s'

		document.getElementById('audio-jogo').pause()

		document.getElementById('btn-reset').setAttribute('disabled', 'disabled')
		
		if(vitoria) {
			setTimeout(function() {
				planeta.style.backgroundPosition = '0px 0px'
				jogo.className = 'd-none'
				barras.className += ' d-none'

				telaVitoria()
			}, 2000)

		} else if(derrota) {
			setTimeout(function() {
				planeta.style.backgroundPosition = '0px 0px'
				barras.style.transition = ''
				jogo.className += ' d-none'
				barras.className += ' d-none'
				
				// -- //
				setTimeout(function() {
					planeta.style.transition = '0s'
					telaDerrota()
				}, 4000)
			}, 2000)
		}
	}
}

// usadas dentro de loopJogo()
function telaVitoria() {
	setTimeout(function() {

		if(musicas == 1) {
			document.getElementById('audio-vit').currentTime = 0
			document.getElementById('audio-vit').volume = volum_mus
			document.getElementById('audio-vit').play()
		}

		let texto = document.getElementById('text-reslt')
		texto.style.transition = '2s'
		texto.innerHTML = '<h1>VITÓRIA</h1>'
		texto.style.color = '#ffffff'
		texto.style.opacity = 0.8
		document.getElementById('back-jogo').style.animationPlayState = 'paused'
		document.getElementById('planeta-reslt').style.transition = '0s'

		// -- //
		setTimeout(function() {
			document.getElementById('btn-reset').removeAttribute('disabled')
		}, 2000)
	}, 3500)
}

// usadas dentro de loopJogo()
function telaDerrota() {

	let brilho_derr = document.getElementById('brilho_derr')
	if(cont_derrot < 6) {

		if(cont_derrot == 5) {
			let planeta = document.getElementById('planeta-reslt')
			planeta.style.background = 'url(img/planeta-derr.png) no-repeat'
			planeta.style.backgroundSize = '500px 500px'
			document.getElementById('tela-jogo').style.background = 'linear-gradient(145deg, #341F27, #150A0F)'
			document.getElementById('back-jogo').style.animationPlayState = 'paused'
		}

		brilho_derr.innerHTML += `<div id="brilho_derr${cont_derrot}" class="camada"></div>`

		let aux = document.getElementById(`brilho_derr${cont_derrot}`)
		aux.style.background = `url(img/brilho-derr/brilho_derr${cont_derrot}.png) no-repeat`
		aux.style.backgroundSize = '500px 500px'
		cont_derrot++

		// -- //
		setTimeout(function() {
			frames_derrota = requestAnimationFrame(telaDerrota)
		}, 10)
	}

	if(cont_derrot == 6) {
		if(musicas == 1) {
			document.getElementById('audio-derr').currentTime = 0
			document.getElementById('audio-derr').volume = volum_mus
			document.getElementById('audio-derr').play()
		}
		let texto = document.getElementById('text-reslt')
		texto.style.transition = '4s'
		texto.innerHTML = '<h1>DERROTA</h1>'
		texto.style.color = '#EB4949'
		texto.style.opacity = 0.8

		brilho_derr.style.transition = '5s'
		brilho_derr.style.opacity = 0

		// -- //
		setTimeout(function() {
			document.getElementById('btn-reset').removeAttribute('disabled')
		}, 4000)
	}
}

// capturando evendo de clicar na tecla e executando function teclaDw()
document.addEventListener('keydown' , teclaDw)
function teclaDw() {
	if(jogando) {
		let tecla = event.keyCode

		if(tecla == 38) diry = -1 //cima

		if(tecla == 40) diry = 1 //baixo
		
		if(tecla == 37) dirx = -1 //esquerda
		
		if(tecla == 39) dirx = 1 //direita

		if(tecla == 88) { //tiro
			if(jogando) {
				if(time_tiro == 1) {
					tiro(jogx, jogy)
					time_tiro = 0
				}
			}
		}
	}
}
// capturando evendo de soltar a tecla e executando function teclaUp()
document.addEventListener('keyup' , teclaUp)
function teclaUp() {
	if(jogando) {
		let tecla = event.keyCode

		if((tecla == 38) || (tecla == 40)) diry = 0 //cima - baixo

		if((tecla == 37) || (tecla == 39)) dirx = 0 //esquerda - direita
	}
}

// usada dentro de loopJogo()
function controleJogador() {
	jogx += dirx*vel_J
	jogy += diry*vel_J

	if(jogx <= -4) jogx = -4
	else if(jogx >= 454) jogx = 454

	if(jogy <= -1) jogy = -1
	else if(jogy >= 451) jogy = 451

	if(jogx >= -4 && jogx <= 454) jogador.style.left = jogx + 'px'

	if(jogy >= -1 && jogy <= 451) jogador.style.top = jogy + 'px'
}

// usada dentro de teclaDw()
function tiro(x,y) {
	let tela_tiro = document.getElementById('tiro')
	tela_tiro.innerHTML += `<div class="tiro" style="top: ${y - 10}px; left: ${x + 24}px;"></div>`

	document.getElementById('nave').innerHTML += `<div class="tiro-ani"></div>`

	if(efeitos == 1) {
		let audios_tiro = document.getElementById('audios-tiro')
		audios_tiro.innerHTML = `<audio id="audio-tiro" src="audio/tiro.mp3">`
		document.getElementById(`audio-tiro`).volume = volum_efsn
		document.getElementById(`audio-tiro`).currentTime = 0
		document.getElementById(`audio-tiro`).play()
	}

	let tiro_anim = document.getElementsByClassName('tiro-ani')
	let qtd_anim = tiro_anim.length

	for(let i = 0; i < qtd_anim; i++) {
		setTimeout(function() { tiro_anim[i].remove() }, 120)
	}
}

// usada dentro de loopJogo()
function controleTiro() {
	let tiro = document.getElementsByClassName('tiro')
	let qtd_tiro = tiro.length

	if(qtd_tiro > 0) {
		for(let i = 0; i < qtd_tiro; i++) {
			if(tiro[i]) {
				let pt = tiro[i].style.top
				pt = parseInt(pt.replace('px', ''))

				pt -= vel_T
				tiro[i].style.top = `${pt}px`

				if(pt < 0) tiro[i].remove()
			}
		}
	}
}

// usada dentro de iniciarJogo()
function criarBomba() {
	if(jogando && bmb_totais > 0) {
		let x = Math.random()*440
		let y = -60

		x = parseInt(x)

		let tela_bomba = document.getElementById('bomba')
		tela_bomba.innerHTML += `<div class="bomba" style="background-position: ${x}px ${y}px;"></div>`
		bmb_totais--
	}
}

// usada dentro de loopJogo()
function controleBomba() {
	bombas_total = document.getElementsByClassName('bomba')
	let qtdb = bombas_total.length

	for(var i = 0; i < qtdb; i++) {
		if(bombas_total[i]) {

			let pb = bombas_total[i].style.backgroundPosition
			esp = pb.indexOf(' ')

			let x = parseInt((pb.slice(0, esp)).replace('px', ''))
			let y = parseInt((pb.slice(esp, pb.length)).replace('px', ''))

			y += vel_B

			bombas_total[i].style.backgroundPosition = `${x}px ${y}px`

			if(y > 500) {
				vida_planeta -= pnt_perda

				if(vida_planeta < 1) {
					vida_planeta = 0
				}
				let planeta = document.getElementById('barra-vida')
				planeta.style.width = `${vida_planeta}px`
				bombas_total[i].remove()

				criaExplosaoBomba(x - 23)

				let barra_bomba = document.getElementById('barra-bomba')
				barra_bomb_w -= bmb_perda

				if(barra_bomb_w < 1) barra_bomb_w = 0

				barra_bomba.style.width = `${barra_bomb_w}px` 
				qtd_bombas--
			}
		}
	}
}

// functios que verifica os valor x e y da bomba e do tiro a todo momento
// usado dentro dentro de loopJogo()
function acertoTiroBomba() {
	let bombas = document.getElementsByClassName('bomba')
	let tiros = document.getElementsByClassName('tiro')

	if(tiros.length > 0) {
		for(let i = 0; i < tiros.length; i++) {
			if(tiros[i]) {
				let tx = tiros[i].style.left
				tx = parseInt(tx.replace('px', ''))

				let ty = tiros[i].style.top
				ty = parseInt(ty.replace('px', ''))

				for(let j = 0; j < bombas.length; j++) {

					let pb = bombas[j].style.backgroundPosition
					esp = pb.indexOf(' ')

					let bx = parseInt((pb.slice(0, esp)).replace('px', ''))
					let by = parseInt((pb.slice(esp, pb.length)).replace('px', ''))

					bx += 30
					by += 50

					let ax = tx - bx
					let ay = ty - by
					if(ax < 13 && ax > -13 && ay < 5 && ay > -20) {
						tiros[i].remove()
						bombas[j].remove()
						criaExplosaoTiro((bx - 50), (by - 50))

						let barra_bomba = document.getElementById('barra-bomba')
						barra_bomb_w -= bmb_perda

						if(barra_bomb_w < 0) barra_bomb_w = 0

						barra_bomba.style.width = `${barra_bomb_w}px` 

						qtd_bombas--
					}
				}
			}
		}
	}
}

// usada dentro de acertoTiroBomba()
function criaExplosaoTiro(x, y) {

	if(document.getElementById(`et-${idt_cont - 5}`)) {
		document.getElementById(`et-${idt_cont - 5}`).remove()
	}

	let explosao = document.getElementById('explosao-tiro')
	let date = new Date()
	var random_n = '' + date.getHours() + date.getMinutes() + date.getSeconds() + parseInt(Math.random() * 10000)

	let explosao_tiro = `img/explosao-tiro${id_ttl_tiro}.gif?${random_n}`

	explosao.innerHTML += `<div id="et-${idt_cont}" style="background: url(${explosao_tiro}) ${x}px ${y}px no-repeat; background-size: 100px 100px;" class="explosao-tiro"></div>`

	if(efeitos == 1) {
		if(document.getElementById(`at-ex${idt_cont - 4}`)) {
			document.getElementById(`at-ex${idt_cont - 4}`).remove()
		}
		let explosao_audio_tiro = `audio/explosao-tiro${idt_t}.mp3`
		let audios = document.getElementById(`audios-expl-tiro${idt_t}`)
		audios.innerHTML += `<audio id="at-ex${idt_cont}" src="${explosao_audio_tiro}">`
		document.getElementById(`at-ex${idt_cont}`).volume = volum_efsn + 0.04
		document.getElementById(`at-ex${idt_cont}`).play()

		idt_t == 3 ? idt_t = 1 : idt_t++
	}

	id_ttl_tiro == 3 ? id_ttl_tiro = 1 : id_ttl_tiro++

	idt_cont++
}

// usado dentro de controleBomba()
function criaExplosaoBomba(x) {

	if(document.getElementById(`eb-${idb_cont - 2}`)) {
		document.getElementById(`eb-${idb_cont - 2}`).remove()
	}

	let explosao = document.getElementById('explosao-bomba')
	let date = new Date()
	var random_n = '' + date.getHours() + date.getMinutes() + date.getSeconds() + parseInt(Math.random() * 10000)

	let explosao_bomba = `img/explosao-bomba${id_ttl_bomba}.gif?${random_n}`
	explosao.innerHTML += `<div id="eb-${idb_cont}" style="background: url(${explosao_bomba}) ${x}px 400px no-repeat; background-size: 100px 100px;" class="explosao-tiro"></div>`

	if(efeitos == 1) {
		if(document.getElementById(`ab-ex${idb_cont - 4}`)) {
			document.getElementById(`ab-ex${idb_cont - 4}`).remove()
		}
		let explosao_audio_bomba = `audio/explosao-bomba${idb_b}.mp3?${random_n}`
		let audios_b = document.getElementById(`audios-expl-bomba${idb_b}`)
		audios_b.innerHTML += `<audio id="ab-ex${idb_cont}" src="${explosao_audio_bomba}">`
		document.getElementById(`ab-ex${idb_cont}`).volume = volum_efsn
		document.getElementById(`ab-ex${idb_cont}`).play()

		idb_b == 3 ? idb_b = 1 : idb_b++ 
	}

	id_ttl_bomba == 1 ? id_ttl_bomba = 2 : id_ttl_bomba = 1

	idb_cont++
}