let mongoose = require('mongoose');

// Jobboard Schema
let jobboardSchema = mongoose.Schema({
  name : {
    type: String
  },
  product : {
    type: String
  },
  slug : {
    type: String
  },
  image : {
    type: String
  }
});

let Jobboard = module.exports = mongoose.model('Jobboard', jobboardSchema);
