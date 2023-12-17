const express = require ('express');
const fs =require('fs');
const app = express();

//top level code runs once
const tours = JSON.parse(fs.readFileSync('./dev-data/data/tours-simple.json'));


//middle ware
app.use(express.json());
//middle ware is basically a function that modifies the request

//tours endpoint
app.get('/api/v1/tours',(req,res)=>{
    res.status(200).json({
        status:'success',
        data:{
            tours:tours
        }
    });
});

//post 
//out of the box express does not puts body data in req for that we need to use middle ware
app.post('/api/v1/tours',(req,res)=>{
    const newId = tours[tours.length-1].id +1;
    const newTour= Object.assign({id:newId},req.body);
    tours.push(newTour);
    fs.writeFile(  `${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours),err=>{
        if(err){
            res.status(500).send('💥💥💥💥Failed to do that 💥💥💥💥')
        }
        res.status(201).json(
            {
                status:"success",
                data:{
                    tour:newTour
                }
            }
        )
    } );
    
});

const port =3000;
app.listen(port,()=>{
    console.log(`listening🦻🏻🦻🏻🦻🏻 in ${port}......` );
});
