const http = require('http')
const fs = require('fs')
const db = require('./db')


const server = http.createServer(async(req,res)=>{
    if(req.url == '/' && req.method == 'GET'){
        fs.readFile('./views/index.html',(err, file)=>{
            res.writeHead(200,{'Content-Type':'text/html'})
            res.write(file, 'utf-8')
            res.end()
        })
    }   
    // agregar usuario  
    if(req.url == '/usuario' && req.method == 'POST'){
        let params
        req.on('data', body =>{
            params = body;
        });
        req.on('end', async ()=>{
        const paramsArray = Object.values(JSON.parse(params)) // llegamos al buffer y agregamos JSON.parse    //Object.values para extraer informacion
            //console.log(Object.values(JSON.parse(params)))
            const result = await db.createUser(paramsArray)
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.write(JSON.stringify(result))      //JSON.parse es cuando quiero pasar de un string a objeto de javascript
            res.end()
        });
        

    }
    // mostrar usuario
    if(req.url == '/usuarios' && req.method == 'GET'){
        const result = await db.getUsers()
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.write(JSON.stringify(result.rows))      //JSON.stringify es cuando quiero pasar de un objeto a string
            res.end()
    }
    //login usuario
    if(req.url == '/login' && req.method == 'POST'){
        let params, statusCode
        req.on('data', body =>{
            params = body;
        });
        req.on('end', async ()=>{
            const paramsArray = Object.values(JSON.parse(params)) //  ['Sincere@april.biz', 'secret']    // esto lo hace Object.values
            const result = await db.login(paramsArray)   
            if (result.rows.length > 0 ) {
                statusCode = 200
            }else{
                statusCode = 403
            }
            res.writeHead(statusCode, {"Content-Type": "application/json"})
            res.write(JSON.stringify(result.rows))
            res.end()
        })
    }
})
server.listen(3000, ()=> console.log('escuchando 3000'))