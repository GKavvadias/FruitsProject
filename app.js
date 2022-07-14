const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/FruitsDB");

const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 10
  },
  review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit ({
  name: "Banana",
  rating: 7,
  review: "Good"
});

//fruit.save();

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favouriteFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);

const pear = new Fruit ({
  name: "Pear",
  score: 7,
  review: "Ok"
});

const orange = new Fruit ({
  name: "Orange",
  score: 8,
  review: "Tasty"
});

//orange.save();

const person = new Person ({
  name: "John",
  age: 37,
  favouriteFruit: orange
});

const amy = new Person ({
  name: "Amy",
  age: 12,
  favouriteFruit: pear
});

//amy.save();

//person.save();

const melon = new Fruit ({
  name: "Melon",
  rating: 5,
  review: "Hmmmm"
});

const watermelon = new Fruit ({
  name: "Watermelon",
  rating: 9,
  review: "Yummy!"
});

// Fruit.insertMany([melon, watermelon], function(err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Successfully added to FruitsDB!");
//   }
// });

Fruit.find(function(err, fruits) {
  if (err) {
    console.log(err);
  } else {

    mongoose.connection.close();

    fruits.forEach(function(fruit) {
      console.log(fruit.name);
    });
  }
});

// Fruit.updateOne({_id: "62cfafdc28a3ee25acd71cf5"}, {name: "Peach"}, function(err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Successfully updated the document!");
//   }
// });

// Person.deleteOne({_id: "62cfc04e1a823d17b75234fa"}, function(err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Successfully deleted!");
//   }
// });

// Person.deleteMany({name: "John"}, function(err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Successfully deleted!");
//   }
// });

const findDocuments = function(db, callback) {

  // Get the documents collection
  const collection = db.collection("fruits");

  // Find some documents
  collection.find({}).toArray(function(err, fruits) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(fruits);
    callback(fruits);
  });
};
