const express = require('express');
const app = express();

const db = require('./db');
const bodyParser = require('body-parser');
app.use(bodyParser.json());



app.get('/',function(req,res){
    res.send("Welcome to my hotel");
});


const userRoutes = require('./router/personRoutes');
const menuItemsRoutes = require('./router/menuItemsRoutes');


app.use('/users',userRoutes);
app.use('/menu',menuItemsRoutes);

app.listen(3000, ()=>{
    console.log('Listening to port 3000')
})
