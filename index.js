var express    = require('express');
var app        = express();
var http       = require('http').Server(app);
var io         = require('socket.io')(http);
var bodyParser = require('body-parser');
var ent        = require('ent');
var path       = require('path');
var md5        = require('MD5');
var mongoose   = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/chat-express');

var userSchema = new mongoose.Schema({ 
    login: String,
    password: String
});

var Users = mongoose.model('Users', userSchema, 'Users');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);


app.get('/', function(req, res) {
    res.render(__dirname + '/views/index.ejs', { error: '', login: '' }, function(err, html) {
        res.send(html);
    });
});


app.post('/', function(req, res) {
  var login    = req.body.login;
  var password = req.body.password;

  if (login && password) {

    // Vérification login + password
    Users.findOne({ login: login, password: md5(password) }, function(err, users) {
      if (users == null) {
        res.render(__dirname + '/views/index.ejs', { error: 'mauvais identifiant', login: login }, function(err, html) {
            res.send(html);
        });
      } else {
        // Récupération des autres utilisateurs
        Users.find({ "login": {$ne: login }}, function(err, contacts) {
          res.render(__dirname + '/views/chat.ejs', { login: login, contacts: contacts }, function(err, html) {
              res.send(html);
          });
        });

      }
    });

  } else {
    res.render(__dirname + '/views/index.ejs', { error: 'Merci de remplir tous les champs', login: login }, function(err, html) {
        res.send(html);
    });
  }

});

// FORMULAIRE D'INSCRIPTION
app.get('/signup', function(req, res) {
    res.render(__dirname + '/views/signup.ejs', { error: '', login: '' }, function(err, html) {
        res.send(html);
    });
});


// FORMULAIRE D'INSCRIPTION POST
app.post('/signup', function(req, res) {
    var login     = req.body.login;
    var password  = req.body.password;
    var password2 = req.body.password2;

    if (login && password && password2) {

        if (password == password2) {

            // Vérification si login unique
            Users.findOne({login: login}, function(err, user) {

                if (user) {
                    res.render(__dirname + '/views/signup.ejs', { error: 'Utilisateur ' + login + ' existant, merci de choisir un autre nom', login: '' }, function(err, html) {
                        res.send(html);
                    });

                } else {
                    // Encapsulation des données
                    user = new Users({
                        'login': login,
                        'password': md5(password)
                    });

                    // Insertion des données
                    user.save(function(err) {
                        console.log(err);
                        if (err == null) {
                            console.log('Utilisateur ' + login + ' ajouté');
                        }
                    });

                    res.redirect('/');
                }

            });


        } else {
            res.render(__dirname + '/views/signup.ejs', { error: 'Erreur dans le mdp', login: login }, function(err, html) {
                res.send(html);
            });
        }

    } else {
        res.render(__dirname + '/views/signup.ejs', { error: 'Merci de renseigner tous les champs', login: '' }, function(err, html) {
            res.send(html);
        });
    }
});


var users       = [];
var typingUsers = [];


// WEBSOCKETS
io.on('connection', function(socket) {

    var loggedUser;

    // Utilisateur connecté
    socket.on('login', function(login) {
        var userIndex = -1;

        for (i = 0; i < users.length; i++) {
          if (users[i] === login) {
            userIndex = i;
          }
        }

        if (login !== undefined && userIndex === -1) {
            users.push(login);
        }

        loggedUser = login;

        console.log('--> Connexion de ' + login);
        console.log(users);
        io.emit('login', login, users);
    });

    // Utilisateur déconnecté
    socket.on('disconnect', function() {
        if (loggedUser !== undefined) {
            login = loggedUser;
            console.log('<-- Déconnexion de ' + login);
            var userIndex = users.indexOf(login);

            if (userIndex !== -1) {
                users.splice(userIndex, 1);
            }

            io.emit('logout', login, users);
        }
    }); 


    // Message envoyé
    socket.on('newMessage', function(message, login) {
        message = ent.encode(message);
        io.emit('newMessage', {login: login, message: message});
    });


    // En cours de rédaction d'un message
    socket.on('startTyping', function(login) {
        if (typingUsers.indexOf(login) === -1) {
          typingUsers.push(login);
        }

        console.log('~~ ' + login + ' is typing');
        io.emit('updateTyping', typingUsers, login);
    });


    // Arrête de rédiger un message
    socket.on('stopTyping', function(login) {
        var typingUserIndex = typingUsers.indexOf(login);
        if (typingUserIndex !== -1) {
          typingUsers.splice(typingUserIndex, 1);
        }

        console.log('// ' + login + ' stop typing');
        io.emit('updateTyping', typingUsers, login);
    });

});


http.listen(3000, function(){
    console.log('listening on *:3000');
});