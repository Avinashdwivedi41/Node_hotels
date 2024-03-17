const express = require('express');
const router = express();

const MenuItems = require('../models/MenuItems');

router.post('/',async(req,res)=>{
    try{
        // Assuming the request body contain the person data
       const data = req.body

       // create a new person document using the mongoose model
       const newMenu = new MenuItems(data);


       //save the new person to the database
       const response = await newMenu.save();
       console.log('Data Saved');
       res.status(200).json(response);
    }
    catch(err){
       console.log(err);
       res.status(500).json({error: 'Internal Server Error'});
    }

})

router.get('/',async(req,res)=>{
    try{
        const data =await MenuItems.find();
        console.log('Data Fetched');
       res.status(200).json(data);
    }catch(err){
        console.log('Error');
       res.status(500).json({error: 'Internal Server Error'});
    }
})

router.get('/:taste',async (req,res)=>{
    try{
        const taste = req.params.taste;
        if(taste =='sweet' || taste=='sour' || taste =='spicy'){
            const response = await MenuItems.find({taste: taste});
            console.log('response fetched');
            res.status(200).json(response);
        }else{
            res.status(404).json({error: 'Invalid work type'});
        }
    }
    catch(err){
        console.log('err');
        res.status(500).json({error: 'Error occured'});
    }
})

module.exports = router;
