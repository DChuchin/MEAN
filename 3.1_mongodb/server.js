const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const url = 'mongodb://localhost:27017/pokemons';
const pokemons = require('./pokemons');

MongoClient.connect(url, (err, db) => {
  if (err) {
    console.log('Невозможно подключиться к серверу MongoDB. Ошибка: ', err);
  } else {
    console.log('Соединение установлено для ', url);

    const collection = db.collection('pokemons');

    collection.insert(pokemons, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        collection.find({name:"Pikachu"}).toArray((err, result) => {
          if (err) {
            console.log(err);
          } else if (result.length) {
            console.log('Найденный:', result);
          } else {
            console.log('Нет документов с данным условием поиска');
          }
        });
        collection.remove();
      };
      db.close();
    });
  }
});
