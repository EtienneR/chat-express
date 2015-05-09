var app        = require('express')();
var http       = require('http').Server(app);
var io         = require('socket.io')(http);
var bodyParser = require('body-parser');
var ent        = require('ent');


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


var users       = [];
var typingUsers = [];


// Webscokets
io.on('connection', function(socket) {

    var loggedUser;


    // Utilisateur connecté
    socket.on('login', function(pseudo) {
        var userIndex = -1;

        for (i = 0; i < users.length; i++) {
          if (users[i] === pseudo) {
            userIndex = i;
          }
        }

        if (pseudo !== undefined && userIndex === -1) {
            users.push(pseudo);
        }

        loggedUser = pseudo;

        console.log('--> Connexion de ' + pseudo);
        console.log(users);
        io.emit('login', pseudo, users);
    });


    socket.on('disconnect', function() {
        if (loggedUser !== undefined) {
            pseudo = loggedUser;
            console.log('<-- Déconnexion de ' + pseudo);
            var userIndex = users.indexOf(pseudo);

            if (userIndex !== -1) {
                users.splice(userIndex, 1);
            }

            io.emit('logout', pseudo, users);
        }
    }); 


    // Message envoyé
    socket.on('newMessage', function(message, pseudo) {
        message = ent.encode(message);
        io.emit('newMessage', {pseudo: pseudo, message: message});
    });


    // En cours de rédaction d'un message
    socket.on('startTyping', function(pseudo) {
        if (typingUsers.indexOf(pseudo) === -1) {
          typingUsers.push(pseudo);
        }

        console.log('~~ ' + pseudo + ' is typing');
        io.emit('updateTyping', typingUsers, pseudo);
    });


    // Arrêtre de rédiger un message
    socket.on('stopTyping', function(pseudo) {
        var typingUserIndex = typingUsers.indexOf(pseudo);
        if (typingUserIndex !== -1) {
          typingUsers.splice(typingUserIndex, 1);
        }

        console.log('// ' + pseudo + ' stop typing');
        io.emit('updateTyping', typingUsers, pseudo);
    });

});


http.listen(3000, function(){
    console.log('listening on *:3000');
});