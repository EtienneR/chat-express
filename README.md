# Chat sur NodeJS avec des Websocket (alpha)

## Installation

Installer les dépendances :  
<code>npm install</code>

Lancer le serveur :  
<code>node index</code>


## Frameworks utilisés

* ExpressJS
* SocketIO
* Ent (Encode and decode HTML entities)
* jQuery (à remplacer par Angular...)


## Fonctionnalités / recettage

- Affiche les utilisateurs connectés
- Affiche si un utilisateur est en train de rédiger un message
- Détection si le message envoyé contient uniquement :
* une image 
* une vidéo Youtube
* une vidéo Vimeo
* une vidéo Dailymotion
* une vidéo Vine
* quelques smileys


## A corriger

* ~~Injection de code Javascript dans le message...~~
* ~~Déconnexion "sauvage" d'un utilisateur (tableau non mis à jour dans la liste des utilisateurs côté serveur)~~
* Plein d'autres choses
