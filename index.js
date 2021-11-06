const mongoose = require("mongoose");

const Dishes = require("./models/dishes");

const url = "mongodb://localhost:27017/example";
const connect = mongoose.connect(url);

connect.then((db) => {
  console.log("Connected");

  Dishes.create({
    name: "Kabab",
    description: "Amazing",
  })
    .then((dish) => {
      console.log(dish);

      return Dishes.find({});
    })
    .then((dishes) => {
      console.log(dishes);

      return Dishes.remove({});
    })
    .then(() => {
      return mongoose.connection.close();
    })
    .catch((err) => {
      console.log(err);
    });
});
