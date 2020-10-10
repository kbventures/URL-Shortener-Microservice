
//Environement variables
require('dotenv').config()


const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

autoIncrement.initialize(connection);


connection.once("open", function(){
    console.log('MongoDB database connection established successfully');
});


/** # SCHEMAS and MODELS #
/*  ====================== */


const {Schema} = mongoose;

const shortenerSchema = new Schema({
  original_url: {type: String}
})

shortenerSchema.plugin(autoIncrement.plugin, {model: 'Shortener', field: 'short_url'});

var Shortener = connection.model('Shortener', shortenerSchema);


var createAndSaveURL = function(done) {
  var shortenerTest = new Shortener({url:done});
  shortenerTest.save(function(err, data){
    if(err) return console.error(err);
    done(null,data)
  });  
};


//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.ShortenerModel = Shortener;
exports.createAndSaveURL = createAndSaveURL;


