var express = require('express');
var mongoose = require('mongoose');

var app = express();
mongoose.connect('mongodb+srv://aaron:test@first-mongodb-lx5vf.mongodb.net/test?retryWrites=true&w=majority');

var Schema = mongoose.Schema;

var personSchema = new Schema({
    firstname: String,
    lastname: String,
    address: String
});

var Person = mongoose.model('Person', personSchema);

var john = Person({
    firstname: 'John',
    lastname: 'Doe',
    address: ' 555 Main St'
});

john.save(function(err)  {
    if(err) throw err;

    console.log('John saved!');
});

var port = process.env.PORT || 3000;

app.use('/assets', express.static(__dirname + '/public'));

app.use('/', function(req,res,next){
    console.log('Request Url: ' + req.url);

    Person.find({},  function(err,users) {
        if (err) throw err;

        console.log(users);
    });
    next();
})

app.get('/', function(req, res) {
    res.send('<html><head><link href=assets/style.css type=text/css rel=stylesheet /></head><body><h1>Hello World!!!</h1></body></html>');
});

app.get('/api', function(req, res){
    res.json({firstname:'John', lastname:'Doe'});
});

app.get('/person/:id', function(req, res){
    res.send('<html><head></head><body><h1>Hello '+ req.params.id +'!!!' + req.query.qstr + '</h1></body></html>');
});

app.listen(port);
