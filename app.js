const express = require ('express');
const fs =require('fs');
const app = express();

//top level code runs once
const tours = JSON.parse(fs.readFileSync('./dev-data/data/tours-simple.json'));


//tours endpoint
app.get('/api/v1/tours',(req,res)=>{
    res.status(200).json({
        status:'success',
        data:{
            tours:tours
        }
    });
});


const port =3000;
app.listen(port,()=>{
    console.log(`listening🦻🏻🦻🏻🦻🏻 in ${port}......` );
});
