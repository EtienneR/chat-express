# Chat sur NodeJS avec des Websocket (alpha)

## Installation

Installer les dépendances :  
<code>npm install</code>

Lancer le serveur :  
<code>node index</code>


## Frameworks utilisés

* ExpressJS
* SocketIO
* jQuery (à remplacer par Angular...)


## Fonctionnalités avancées

- Affiche les utilisateurs connectés

- Affiche si un utilisateur est en train de rédiger un message

- Détection si le message envoyé contient uniquement :
* une image (balise <code><img></code>)
* une vidéo Youtube (balise <code><iframe></code> après récupération de l'id de la vidéo)


## A corriger

* Injection de code Javascript...