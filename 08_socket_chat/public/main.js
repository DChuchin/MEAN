var socket = io();
var user;
form.addEventListener('submit', function(e) {
  e.preventDefault();
  var message = input.value;
  if (message) {
    socket.emit('chat message', message, user);
  }
});

loginForm.addEventListener('submit', function(e) {
  e.preventDefault();
  user = usernameInput.value;
  if (user) {
    socket.emit('user login', user);
    enterChat(user);
  }
})

socket.on('new user', newUser);
socket.on('chat message', function(msg, username) {
  var elem = document.createElement('li');
  elem.classList.add('msg');
  elem.innerText = msg;
  if (username == user) {
    elem.classList.add('msg--my');
  }
  messages.appendChild(elem);
});

function showTip(message) {
  if (tip.classList.contains('is-show')) {
    tip.clssList.remove('.is-show');
  };
  tip.innerText= message;
  tip.classList.add('is-show');
  setTimeout(function() {
    tip.classList.remove('is-show');
  }, 3000);
};
function enterChat(username) {
  login.style.display = "none";
  chatApp.classList.add('is-show');
  userName.innerText = username;
};

function newUser(username) {
  var elem = document.createElement('li'),
      message = 'User '+ username+' has joined us :)';
  elem.innerText = username; 
  rooms.appendChild(elem);
  showTip(message);
};
