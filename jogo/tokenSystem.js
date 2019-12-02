module.exports = class tokenSystem{
	constructor(){
		this.token = {
			jwt: null,
			secretKey: null
		}
		this.token.jwt = require('jsonwebtoken')
		this.token.secretKey = "retruco"
	}
	//cria jsonwebtoken
	tokenCreate(nickName){
		return this.token.jwt.sign({nickName: nickName}, this.token.secretKey, {
			expiresIn: '15000'
		})
	}
	//verifica jsonwebtoken
	tokenVerify(token, callback){
    	this.token.jwt.verify(token, this.token.secretKey, (err, decoded) =>{
        	!err ? callback(decoded) : callback(false)
    	})
	}
}