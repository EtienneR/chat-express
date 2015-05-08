var app        = require('express')();
var http       = require('http').Server(app);
var io         = require('socket.io')(http);
var bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: false }));


app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);


app.get('/', function(req, res) {
    res.render(__dirname + '/views/index.ejs', function(err, html) {
        res.send(html);
    });
});

app.post('/chat', function(req, res) {
    var pseudo = req.body.pseudo;
    res.render(__dirname + '/views/chat.ejs', { pseudo: pseudo }, function(err, html) {
        res.send(html);
    });
});

// Utilisateurs connectés
var users = [];


// Webscokets
io.on('connection', function(socket) {
    var typingUsers = [];


/*  for (i = 0; i < users.length; i++) {
    socket.emit('login', users[i]);
  }*/
    //var users = [ { id: 1, name: 'titi' }, { id: 2, name: 'Hodor' } ];
    
/*    Et non : 
    [ { id: 1, name: 'titi' } ]
    [ { id: 1, name: 'Hodor' } ]*/


    // Utilisateur connecté
    socket.on('login', function(pseudo) {
        //users.push({id: users.length+1,name: pseudo});
        var userIndex = -1;

        for (i = 0; i < users.length; i++) {
          if (users[i] === pseudo) {
            userIndex = i;
          }
        }

        if (pseudo !== undefined && userIndex === -1) {
            users.push(pseudo);
        }

        console.log('--> Connexion de '+ pseudo);
        console.log(users);
        io.emit('login', pseudo, users);
    });

    // Ne pas utiliser "disconnected /!\"
    socket.on('logout', function(pseudo) {
        console.log('<-- Déconnexion de '+ pseudo);
        var userIndex = users.indexOf(pseudo);
        console.log('Index '+userIndex);
        if (userIndex !== -1) {
            users.splice(userIndex, 1);
        }

        console.log(users);
        io.emit('logout', pseudo, users);
    });

    // Message envoyé
    socket.on('newMessage', function(message, pseudo) {
        io.emit('newMessage', {pseudo: pseudo, message: message});
    });

    // En cours de rédaction d'un message
    socket.on('startTyping', function(pseudo) {
        if (typingUsers.indexOf(pseudo) === -1) {
          typingUsers.push(pseudo);
        }
        console.log('~~ '+ pseudo + ' is typing');
        io.emit('updateTyping', typingUsers);
    });

    socket.on('stopTyping', function(pseudo) {
        var typingUserIndex = typingUsers.indexOf(pseudo);
        if (typingUserIndex !== -1) {
          typingUsers.splice(typingUserIndex, 1);
        }

        console.log('// '+ pseudo + ' stop typing');
        io.emit('updateTyping', typingUsers);
    });

});


http.listen(3000, function(){
    console.log('listening on *:3000');
});