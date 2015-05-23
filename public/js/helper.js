function getNbUsers(nbUsers) {
  $('#left h2').hide();

  if (nbUsers == 1) {
    $('#users').before('<h2>' + nbUsers + ' utilisateur connecté</h2>');
  } else {
    $('#users').before('<h2>' + nbUsers + ' utilisateurs connectés</h2>');
  }
}

function getUsers(users) {
  $('#users li').hide();
  for (i = 0; i < users.length; i++) {
    $('#users').prepend('<li class="' + users[i] + '"><img src="http://api.adorable.io/avatar/32/' + users[i] + '" alt=""/><span>' + users[i] + '</span></li>');
  }
  $('#users li.' + currentLogin).hide();
}

function insereMessage(login, message) {
  if (currentLogin == login) {
    $('#messages').append('<li class="current"><p>' + message + '</p><div id="message-info"><span>[' + date() + ']</span><img src="http://api.adorable.io/avatar/32/' + login + '" alt="" /></div></li>');
  } else {
    $('#messages').append('<li><p>' + message + '</p><div id="message-info"><span>' + login + ' [' + date() + ']</span><img src="http://api.adorable.io/avatar/32/' + login + '" alt="" /></div></li>');
  }
}

function scrollAuto() {
  return $('html, body').animate({scrollTop:$(document).height()}, 'slow');
}

function date() {
  var date = new Date();
  var h = date.getHours();
  if (h < 10) {h = "0" + h}
  var m = date.getMinutes();
  if (m < 10) {m = "0" + m}
  var s = date.getSeconds();
  if (s < 10) {s = "0" + s}

  time = h + ':'+ m + ':' + s;

  return time;
}

function editMessage(txt) {
  return emojione.shortnameToImage(txt);
}