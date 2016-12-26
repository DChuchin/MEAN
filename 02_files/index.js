const {hide, seek} = require('./modules/hidenseek');
const random = require('./modules/random');
const pokemonsData = require('./data/pokemons');

const COMMANDS = process.argv;

function help() {
  console.log('Попробуйте следующие команды:');
  console.log('node index hide ./path ./data.json - спрятать случайное число покемонов из файла data.json в директорию ./path');
  console.log('node index seek ./path - найти всех покемонов в директории ./path');
}

if (COMMANDS.length < 3) {
  help();
} else start();

function start () {
  let path = COMMANDS[3] || './field';
  if (COMMANDS[2] == 'hide') {
    let data = (COMMANDS[4] ? require(COMMANDS[4]) : pokemonsData);
    hide(path, data);
  } else if (COMMANDS[2] == 'seek') {
    seek(path);
  } else help();
}
