const fs = require('fs')

var naipe = 'c'

let dir= './copas/'

fs.readdir(dir, (err, arq) =>{
	for(let i in arq){
		fs.rename(dir+arq[i], dir+`${naipe}${arq[i]}`, err =>{

		})
	}
})