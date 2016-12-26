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

let ivysaur = new Pokemon('Ivysaur', 10);
let venusaur = new Pokemon('Venusaur', 37);
let charmander = new Pokemon('Charmander', 46);
let lost = new PokemonList(ivysaur, charmander);
let found = new PokemonList(venusaur);

lost.add('Pikachu',37).add('Raichu', 69);
found.add('Bulbasaur', 80).add('Wartortle', 56);

PokemonList.prototype.show = function() {
    console.log(`Список покемонов (кол-во ${this.length})`);
  for (let pokemon of this) {
    pokemon.show();
  };
};

found.push(...lost.splice(0,1));

Pokemon.prototype.valueOf = function() {
  return this.level;
};

PokemonList.prototype.max = function() {
  return this.reduce((res,item)=> item > res ? item : res, this[0]);
};

lost.show();
found.show();
console.log(lost);
console.log(found);
console.log(lost.max());
console.log(found.max());
