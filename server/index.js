require('dotenv').config();

const express = require('express');

const db=require('./models')
const handle=require('./handlers')
const routes=require('./routes')

const cors=require('cors');
const bodyParser=require('body-parser');

const app =express();
const port=process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.json({
        hello:'hello world'
    });
})
app.use('/api/auth',routes.auth);

app.use('/api/polls',routes.poll);

//Error Handler

app.use(handle.notFound);

app.use(handle.errors);

//End of Error Handler


app.listen(port,console.log(`Server started on port ${port}`));