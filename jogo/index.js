//servidor http
let express = require("express")
let app = express()
const http = require('http').createServer(app)
//servidor socket
const io = require('socket.io').listen(http)
//meu ip
let ip = require('ip')
    ip = ip.address()
let porta = 80
//jogadores
let jogadores = require('./jogadores')
	jogadores = new jogadores()
//login
let login = require('./login')
	login = new login(jogadores)
//duplas jogando online
let duplas = require('./duplas')
	duplas = new duplas()

//redirecionamento index.html
app.get('/', (req, resp, next) =>{
	resp.redirect('/public/index.html')
	next()
})
//servidor de arquivos estaticos http
app.use('/public',express.static('public'))
app.use('/scripts', express.static(`${__dirname}/node_modules/`));

//conecao socket de clientes
io.on('connection', client =>{
	//cliente envia o nickname e recebe o JWT
	client.on('login', nickName =>{
		login.login(nickName, client)
	})
	client.on('existeJogador', nickName =>{
		login.nickNameVerify(nickName, client)
	})
	client.on('pedidoDuplas', nickNameAdver =>{
		pedidoDuplas(client, nickNameAdver)
	})
  //MUITO IMPORTANTE
  //verifica o token e renova a sessao
	client.on('online', token =>{
		login.jogadorOnline(client, token)
	})
  //
  //jogador desconectado do socket
	client.on('disconnect', () =>{ })
	client.on('error', error => console.error(error) )
})

setInterval(() => {
   	io.emit('broadcast', {
      	action: 'jogadores',
      	jogadores: jogadores.jogadores
    })
 }, 1500)

function pedidoDuplas(client, nickNameAdver){
	if(!jogadores.existeJogador(false, client.id)) return
	if(!jogadores.existeJogador(nickNameAdver.nickName, false)) return

	duplas.setDupla(
		[{ 
			jogador: jogadores.getJogadorSocketId(client.id)
		},
		{
			jogador: jogadores.getJogadorNickname(nickNameAdver.nickName)
		}]
	, () =>{
		console.log(jogadores)
	})
	//console.log(duplas.duplas[0][0].jogador)
}
//servico http escutando na porta :80
http.listen(porta, () =>{
	console.log(`[http] escutando: ${ip}:${porta}`)
})
