const mongoose =  require('mongoose');
require('dotenv').config();

// define the mongodb connection  local database url 
// const mongoURL = process.env.MONGODB_URL_LOCAL


// define the mongodb connection  online database url 
const mongoURl = process.env.MONGODB_URL
mongoose.connect(mongoURl,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

const db = mongoose.connection;

db.on('connected',()=>{
    console.log('connected to mongodb server');
});

db.on('error',(err)=>{
    console.log('connected to error ',err);
});

db.on('disconnected',()=>{
    console.log('disconnected to mongodb server');
});

module.exports = db;