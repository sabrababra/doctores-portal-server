const express = require('express');
const cors = require('cors');
const port=process.env.port||5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const app=express();

app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.r5wfiz1.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        const appointmentOptionCollection=client.db('doctorsPortal').collection('appointmentOptions');
        const bookingCollection=client.db('doctorsPortal').collection('bookings');


        app.get('/appointmentOptions',async(req,res)=>{
            const date=req.query.date;
            console.log(date);
            const query={};
            const options=await appointmentOptionCollection.find(query).toArray();
            res.send(options);
        })

        app.post('/bookings',async(req,res)=>{
            const booking=req.body;
            console.log(booking);
            const result=await bookingCollection.insertOne(booking);
            res.send(result);
        })
    }
    finally{

    }
}
run().catch(console.log())



app.get('/',async(req,res)=>{
    res.send('doctors portal running');
})

app.listen(port,()=>console.log('portal run',port))