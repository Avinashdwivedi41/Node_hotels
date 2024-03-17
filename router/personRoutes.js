const express = require('express');
const router = express();

const Users = require('./../models/Users');

router.post('/',async(req,res)=>{
    try{
        // Assuming the request body contain the person data
       const data = req.body

       // create a new person document using the mongoose model
       const newPerson = new Users(data);


       //save the new person to the database
       const response = await newPerson.save();
       console.log('Data Saved');
       res.status(200).json(response);
    }
    catch(err){
       console.log('Error');
       res.status(500).json({error: 'Internal Server Error'});
    }

})

router.get('/',async(req,res)=>{
    try{
        const data =await Users.find();
        console.log('Data Fetched');
       res.status(200).json(data);
    }catch(err){
        console.log('Error');
       res.status(500).json({error: 'Internal Server Error'});
    }
})

router.get('/:workType',async (req,res)=>{
    try{
        const workType = req.params.workType;
        if(workType =='chef' || workType=='manager' || workType =='waiter'){
            const response = await Users.find({work: workType});
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

// Finding the data and Updating the data from the database
router.put('/:id', async (req,res)=>{
    try{
        const personId =  req.params.id;
        const updatedPersonData =  req.body;

        const response = await Users.findByIdAndUpdate(personId, updatedPersonData,{
            new:true, // return the updated version of document
            runValidators: true, //run mongoose validation 
        })
        if(!response){
            return res.status(404).json({error: 'Person not found'});
        }

        console.log('data updated');
        res.status(200).json(response);

    }
    catch(err){
        console.log('err');
        res.status(500).json({error: 'Error occured'});
    }
})

router.delete('/:id',async(req,res)=>{
    try{
        const personId = req.params.id;
        const response = await Users.findByIdAndDelete(personId);
        if(!response){
            return res.status(404).json({error: 'Person not found'});
        }
        console.log('data deleted');
        res.status(200).json({message: 'Person is deleted'});

    }
    catch(err){
        console.log('err');
        res.status(500).json({error: 'Error occured'});
    }
})


module.exports = router;