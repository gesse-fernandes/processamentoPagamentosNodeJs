const express = require('express');

const fs = ('fs');

const path = require('path');



const port = 5000;

const app = express();

app.engine('html', require('ejs').renderFile);

app.set('view engine', 'html');

app.use('/public', express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, '/views'));





app.get('/',(req,res)=>{

    res.render('index');

});



app.listen(port,()=>{
    console.log("http://localhost:5000");
    console.log('Uhul! server rodando ;)');

})