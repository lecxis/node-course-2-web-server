const express= require ('express');
const hbs =require ('hbs');
const fs=require ('fs');

var app=express();
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', ()=>{
  return new Date().getFullYear();
})

hbs.registerHelper('screamIt', (text)=>{
  return text.toUpperCase();
})
app.use(express.static(__dirname +'/public'));

app.use((req,res, next)=>{
  var now = new Date().toString();
  var log=`${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log +'\n', (err)=>{
    if(err){
      console.log('Unable to append to server.log');
    }

  });
next();
});

app.use((req,res, next)=>{
res.render('maintenance.hbs');
}
);

app.get('/', (req, res) =>{
//res.send('<h1>Hello Express</h1>');
/*res.send({
  name:"Andrew",
  likes:["car", "buns"]
});*/
res.render('home.hbs', {
  pageTitle: 'Home Page',
  welcomeMessage:'Welcome to the home page',

});
}
);

app.get('/about', (req, res)=>{
  res.render('about.hbs', {
    pageTitle: 'About Page',

  });
});

app.get('/bad', (req, res)=>{
  res.send(
    {
      errorMessage:'unable to handle request'
    }
  );
});

app.set('view engine', 'hbs');
app.listen(3000 , ()=>{
  console.log('server is live on prt 3000');
});
