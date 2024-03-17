const mongoose =  require('mongoose');

// define the mongodb connection url 
const mongoURL = 'mongodb://localhost:27017/hotels'

mongoose.connect(mongoURL,{
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