const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test_db', { useNewUrlParser: true }, (err) => {
  if (err) return console.error(err);
  return console.log('Connection successful');
});

const { Schema } = mongoose;

const chocolateSchema = new Schema({
  name: {
    type: String,
    required: true,
    min: 2,
  },
  cost: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 1,
    max: 99,
  },
});

const Chocolate = mongoose.model('cake', chocolateSchema);

module.exports = Chocolate;
