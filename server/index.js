require('dotenv').config();

const express = require('express');

const handle=require('./handlers')

const cors=require('cors');
const bodyParser=require('body-parser');

const app =express();
const port=process.env.PORT;

app.use(cors());
app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.json({
        hello:'hello world amigos'
    });
})

//Error Handler

app.use(handle.notFound);

app.use(handle.errors);

//End of Error Handler

app.listen(port,console.log(`Server started on port ${port}`));