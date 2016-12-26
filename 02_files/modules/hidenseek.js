const fs = require('fs');
const random = require('./random');
const pathMod = require('path');
const {Pokemon, PokemonList} = require('./pokemonList');


function createFolders(path='./field', count = 10) {
  return new Promise((resolve,reject)=> {
    let folders = pathMod.normalize(path).split('/');
    let fullPath = '.';
    console.log(folders);
    folders.forEach((item)=> {
      if (item) {
        fullPath += `/${item}`
        fs.mkdirSync(fullPath, (err)=> {
          if (err) {
            console.log(err);
            reject(err);
          }
        });
      };
    });
    for (let i = 1; i <= count; i++) {
      let FileName = fullPath + '/' + twoDigit(i);
      fs.mkdir(FileName, (err)=> {
        if(err) {
          console.log(err);
          reject(err);
        };
      });
    };
    resolve(path);
  });
};

function twoDigit(num) {
    return (num < 10 ? `0${num}` : num)
};

function getRandomPokemon(list) {
  let pokemonCount = list.length;
  let randomNum = random(0, pokemonCount - 1);
  let pokemon = list[randomNum];
  return {
      info:`${pokemon.name}|${pokemon.level}`,
      pokemon: pokemon
  }
};

function hidePokemon(pokemon, path) {
  return new Promise((resolve,reject) => {
    fs.appendFile(path + '/pokemon.txt', pokemon, (err) => {
      if (err) {
        reject(err);
      }
    });
  });
};

function deepSeek(path) {
  let pokemons = [];
  return new Promise((resolve, reject)=> {
    fs.readFile(path + '/pokemon.txt', 'utf-8', (err, data)=> {
      if (err) {
        fs.readdir(path, (err, folders)=> {
          if (folders.length) {
            folders.forEach((folder)=>{
              deepSeek(path+'/'+folder);
            })
          }
        });
      } else {
        console.log(data);
        resolve();
      }
    });
  });
};
// function outputPoks(data) {
//   if (data.length) {
//     console.log('---------found pokemons:');
//     data.forEach((item) => {
//       let pokemon = item.split('|');
//       console.log(`name: ${pokemon[0]}`);
//       console.log(`level: ${pokemon[1]}`);
//     })
//   } else {
//     console.log('Pokemons are not found');
//   }
// }

module.exports = {
  hide: function(path, pokemonsData) {
    let pokemonList = new PokemonList;
    pokemonList.addAll(pokemonsData);
    let hiddenPokemons = [];
    createFolders(path, 10)
      .then((path)=> {
        let countRandomPokemons = pokemonList.length < 3 ? random(1 , pokemonList.length) : random(1,3);
        for (let i = 0 ; i<countRandomPokemons; i++) {
          let {info, pokemon}  = getRandomPokemon(pokemonList);
          while (hiddenPokemons.indexOf(pokemon) != -1) {
            let randomPokemon = getRandomPokemon(pokemonList);
            info = randomPokemon.info;
            pokemon = randomPokemon.pokemon;
          };
          let randomFolder = twoDigit(random(1,10));
          hiddenPokemons.push(pokemon);
          hidePokemon(info, path + '/' + randomFolder);
        };
        console.log('------Hidden Pokemons:');
        hiddenPokemons.forEach(item => item.show());
      })
      .catch(err => console.log(err));
  },
  seek: function (path) {
    deepSeek(path)
    .catch(err => console.log(err));
  }
};
