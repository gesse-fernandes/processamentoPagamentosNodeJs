const express = require('express');

const fs = ('fs');

const path = require('path');
require('dotenv/config'); 
const stripe = require('stripe')(process.env.SECRET_API);


const port = 5000;

const app = express();

app.engine('html', require('ejs').renderFile);

app.set('view engine', 'html');

app.use('/public', express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, '/views'));





app.get('/',(req,res)=>{

    res.render('index');

});

app.get('/redirectProcessPayment', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
      payment_method_types:['card'],
      line_items: [
       /* {
          
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: '2000',
          quantity: 1,
        },*/
        {
            price_data:{
                currency:'brl',
                product_data:{
                   name: 'IntelSust',
                },
                unit_amount:2000
            },
            quantity: 1
        }
      ],
      mode: 'payment',
      success_url: `http://localhost:5000/sucesso?token={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:5000?falha`,
    });
  
    res.redirect(303, session.url);
  });


app.get('/sucesso/',async (req, res) =>{
    if(req.query.token != null){
        try {
            
        
    const session = await stripe.checkout.sessions.retrieve(
        req.query.token
    )
    
    if(session.payment_status == 'paid'){
        //liberar os products ou o  serviço que você está liberando.
        res.send("PAGO");
    }else{
        res.send("Nao foi pago");
    }
} catch (e) {
            res.send("Falhou");  
}

}else{
    res.send("Precisamos do token");
}
});
app.listen(port,()=>{
    console.log("http://localhost:5000");
    console.log('Uhul! server rodando ;)');

})