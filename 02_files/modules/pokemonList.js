'use strict';

class Pokemon {
  constructor (name='Noname', level=0) {
    this.name = name;
    this.level = level;
  };
    show() {
      console.log(`  ${this.name}, уровень: ${this.level}`)
    };
};

class PokemonList extends Array{
  constructor (...pokemons) {
    super(...pokemons);
  };
  add(name, level) {
    this.push(new Pokemon(name, level));
    return this;
  };
};

PokemonList.prototype.show = function() {
    console.log(`Список покемонов (кол-во ${this.length})`);
  for (let pokemon of this) {
    pokemon.show();
  };
};

Pokemon.prototype.valueOf = function() {
  return this.level;
};

PokemonList.prototype.max = function() {
  return this.reduce((res,item)=> item > res ? item : res, this[0]);
};

PokemonList.prototype.addAll = function(obj) {
  for (let prop in obj) {
    this.add(prop, obj[prop]);
  };
};

module.exports = {
  Pokemon,
  PokemonList
};
