//servidor http
let express = require("express")
let app = express()
const http = require('http').createServer(app)
//servidor socket
const io = require('socket.io').listen(http)
//meu ip
let ip = require('ip')
    ip = ip.address()
let porta = 8080
//jogadores
let jogadores = require('./jogadores')
	jogadores = new jogadores()
//login
let login = require('./login')
	login = new login(jogadores)
//criasala teste
/*
let sala  = require('./sala')
let	salaUm = new sala('sala1', 0, [{nickName : 'teste'}])
let salaDois = new sala('sala2', 0, [{nickName: 'seila'}])
*/
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

	client.on('pedidoXum', nickNameAdver =>{
		console.log(nickNameAdver)
	})

	client.on('online', token =>{
		login.online(token, client)
	})
	client.on('disconnect', () =>{
		jogadores.delJogadorSocket(client.id)
	})
	client.on('error', error => console.error(error) )
})

//servico http escutando na porta :8080
http.listen(porta, () =>{
	console.log(`[http] escutando: ${ip}:${porta}`)
})