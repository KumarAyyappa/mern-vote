const express = require('express');

const handle=require('./handlers')

const app =express();
const port=4000;

app.get('/',(req,res)=>{
    res.json({
        hello:'hello world'
    });
})

//Error Handler

app.use(handle.notFound);

app.use(handle.errors);

//End of Error Handler

app.listen(port,console.log(`Server started on port ${port}`));