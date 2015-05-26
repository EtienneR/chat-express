function getNbUsers(nbUsers) {
  $('#left h2').hide();
  if (nbUsers == 1) {
    $('#users').before('<h2>' + nbUsers + ' utilisateur connecté</h2>');
  } else {
    $('#users').before('<h2>' + nbUsers + ' utilisateurs connectés</h2>');
  }
}

function getUsers(users) {
  //$('#users li').hide();
  for (i = 0; i < users.length; i++) {
    $('span.' + users[i] + ' > span.status').removeClass('offline');
    $('span.' + users[i] + ' > span.status').addClass('online');
    $('span.' + users[i] + ' > span.more').hide();
    $('span.' + users[i]).append('<span class="more">online</span>');
    //$('#users').prepend('<li class="' + users[i] + '"><img src="http://api.adorable.io/avatar/32/' + users[i] + '" alt=""/><span>' + users[i] + '</span></li>');
  }
  //$('#users li.' + currentLogin).hide();
}

function insereMessage(login, message) {
  if (currentLogin == login) {
    $('#messages').append('<li class="me"><span class="about"><span class="more">' + date() + '</span>, <b>' + login + '</b></span><div class="arrow-up right"></div><p>' + message + '</p></li>');
  } else {
    $('#messages').append('<li><span class="about"><b>' + login + '</b>, <span class="more">' + date() + '</span></span><div class="arrow-up left"></div><p>' + message + '</p></li>');
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