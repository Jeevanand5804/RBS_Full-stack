const mongoose = require("mongoose");
const { Schema } = mongoose;

const reservationSchema = new mongoose.Schema({
  email:String,
    name: String,
    number: Number,
    tables: [
      {
        tableName: String,
        capacity: Number,
        isBooked:Boolean,
      }
    ],
    date: Date,
    time: String,
    numberOfPeople: Number,
    selectedFood: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    createdAt: { type: Date, default: Date.now },
  });
  
  const Reservation = mongoose.model('Reservation', reservationSchema);
  module.exports = { Reservation };