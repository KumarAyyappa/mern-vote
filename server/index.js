const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');


const db = require('./models');
const handle = require('./handlers');
const routes = require('./routes');
const config = require('./config');

const app =express();
const port=config.PORT;

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}))
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


app.listen(port,err => {
    if(err){
        console.log(`Error occured as ${err}, unable to create server on port ${port}`);
    }
    console.log(`Server started on port ${port}`);
});