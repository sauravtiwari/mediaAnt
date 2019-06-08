const http = require('http');
const app = require('./app');

const port =3000;

const server = http.createServer(app);

server.listen(port, function(err,res){
    if(err){
        console.log(err);
    }
    else { 
        console.log("server is running on port 3000");
    }
}); 