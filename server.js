console.log('anil');
var http = require('http');
const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;

var db;

console.log('creating connection');
//const url = 'mongodb://localhost:27017/star-war-quotes';
const url ='mongodb://127.0.0.1:27017/star-war-qoutes';

const connection = (closure) => {
  return MongoClient.connect(url, (err, db) => {
  if (err) return console.log(err);
  closure(db)
 // db = client.db('star-war-qoutes') // whatever your database name is
console.log("connected to database");
})
}


console.log('creating connection');
app.use(bodyParser.urlencoded({extended: true}));



app.get('/',(req,res)=>{
  console.log('my dashboard')
  connection((db) => {
    console.log('before calll', db.collection('quotes').find())
    db.collection('quotes').find().toArray().then((quotes) => {
      console.log('my collection data')
    })
  }
)

//var cursor=db.collection('quotes').find();

//res.sendFile(__dirname + '/index.html')
  
})

app.post('/quotes', (req, res) => {
 
  console.log(req.body);
  db.collection('quotes').insert(req.body, (err, result) => {
    if (err) return console.log(err)
    
    console.log('saved to database')
    res.redirect('/')
});
console.log('my post data',res)
});



var port = process.env.PORT || '3002';
app.set('port', port);
var server = http.createServer(app);
server.listen(port, () => console.log('server is sstarted'))

