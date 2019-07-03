var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var path = require('path');
var serveStatic = require('serve-static');

server.listen(process.env.PORT || 5000);
// WARNING: app.listen(80) will NOT work here!
let messages = []
let Mouse = {x:0,y:0}
let players = []

app.get('/', function (req, res) {
  // res.sendFile(__dirname + '/socketclient/public');
  // res.sendFile(__dirname + '/dist');
  app.use(serveStatic(path.join(__dirname, '/dist')));
  console.log("connect get")  
  // res.send("HolaWorld")
});

io.on('connection', function (socket) {
    socket.emit('requestMensajes', messages);
    // console.log("New User Conection")
    // socket.emit('customEmit', { hello: 'world' });
  socket.on('LlegadaDeMensaje', function (data) { 
    messages.push(data)
    console.log("Mensajes", messages);
    socket.emit('requestMensajes', messages);
    socket.broadcast.emit('requestMensajes', messages)
  });
  // io.socket.emit('requestMensajes', messages);

  socket.on("PositionMouse", function (data){
    Mouse.x = data.x;
    Mouse.y = data.y

    // players.push(data)
    // players = data

    // socket.emit('getPosition', players);
    // socket.broadcast.emit('getPosition', players)

    socket.emit('getPosition', Mouse);
    socket.broadcast.emit('getPosition', Mouse)

  })
});

