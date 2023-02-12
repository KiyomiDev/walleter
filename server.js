var StaticServer = require('static-server');
var server = new StaticServer({
  rootPath: './dist', 
  port: 1337,

});

server.start(function () {
  console.log("http://localhost:1337/");
});