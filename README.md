# Chat sur NodeJS avec des Websocket (alpha)


## Installation

Installer les dépendances :  
<code>npm install</code>

Lancer le serveur :  
<code>node index</code>


## Frameworks

* ExpressJS
* jQuery (à remplacer par Angular...)


## Dépendances

* SocketIO
* EJS
* Ent (Encode and decode HTML entities)
* Mongoose
* MD5


## Fonctionnalités / recettage

- Affiche les utilisateurs connectés
- Affiche si un utilisateur est en train de rédiger un message
- Détection si le message envoyé contient uniquement :
* une image 
* une vidéo Youtube
* une vidéo Vimeo
* une vidéo Dailymotion
* une vidéo Vine
- Ajout de quelques smileys


## A corriger

* ~~Injection de code Javascript dans le message...~~
* ~~Déconnexion "sauvage" d'un utilisateur (tableau non mis à jour dans la liste des utilisateurs côté serveur)~~
* ~~Une BDD~~
* Rendre les iframes responsives
* Plein d'autres choses


## Mongo

### Connexion à la base

```javascript
use chat-express
```

### Insertion des utilisateurs

```javascript
db.Users.insert(
{
    login: 'toto',
    password: 'f71dbe52628a3f83a77ab494817525c6'
})

db.Users.insert(
{
    login: 'titi',
    password: '5d933eef19aee7da192608de61b6c23d'
})

db.Users.insert(
{
    login: 'tutu',
    password: 'bdb8c008fa551ba75f8481963f2201da'
})
```

### Vérification

```javascript
db.Users.findOne({$and: [ {login: 'toto'}, {password: 'f71dbe52628a3f83a77ab494817525c6'} ]})
```

### Afficher tous les utilisateurs

```javascript
db.Users.find()
```


### Suppression de la collection "Users"

```javascript
db.Users.drop()
```

### Suppression de la base "chat-express"

```javascript
user chat-express
db.dropDatabase();
```