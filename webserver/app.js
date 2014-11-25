//-----------------------------------//
//                                   //
//     Dépendances des modules       //
//                                   //
//-----------------------------------//


var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);




//-----------------------------------//
//                                   //
//      Gestion du serveur Web       //
//                                   //
//-----------------------------------//

server.listen(80);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/site/index.html');
});

app.get('/admin/', function (req, res) {
  res.sendfile(__dirname + '/site/admin.html');
});

//-----------------------------------//
//                                   //
//   Communication Client / Server   //
//                                   //
//-----------------------------------//

admin = null;
io.on('connection', function (socket) {

    socket.on('admin-connected', function(){
      admin = socket;
    });

    socket.on('client-connected', function(){
      admin.emit('client-connect');
    });

});
