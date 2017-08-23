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
  },
  jobfunction : {
    type: String
  },
  jobposition : {
    type: String
  },
  country : {
    type: String
  },
  repostingisfree : {
    type: String
  }
});


let Jobboard = module.exports = mongoose.model('Jobboard', jobboardSchema);
