var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('contactsdb', ['contactsdb']);
var dbus = mongojs('info', ['info']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

//get all contacts service
app.get('/contacts', function(req, res) {
    console.log('I received the GET request');

    //selecting data from the database
    db.contactsdb.find(function(err, docs) {
        console.log(docs);
        res.json(docs);
    });

});

//insert contact service
app.post('/contacts', function(req, res) {
    console.log(req.body);
    //Insets the new record into the database
    db.contactsdb.insert(req.body, function(err, doc) {
        //after inserting the record into the database, the server sends back a new list records to the controller
        res.json(doc);
    });
});

//delete contact service
app.delete('/contacts/:id', function(req, res) {
    var id = req.params.id;
    console.log(id);
    db.contactsdb.remove({ _id: mongojs.ObjectId(id) }, function(err, doc) {
        //sending back the item we removed from the database
        res.json(doc);
    });
});

app.get('/contacts/:id', function(req, res) {
    var id = req.params.id;
    console.log(id);
    db.contactsdb.findOne({ _id: mongojs.ObjectId(id) }, function(err, doc) {
        res.json(doc);
    });
});

app.put('/contacts/:id', function(req, res) {
    var id = req.params.id;
    console.log(req.body.name);
    db.contactsdb.findAndModify({
        query: { _id: mongojs.ObjectId(id) },
        update: { $set: { name: req.body.name, email: req.body.email, number: req.body.number } },
        new: true
    }, function(err, doc) {
        res.json(doc);
    });

});

app.get('/aboutus', function(req, res) {
    console.log('I received the GET request');

    //selecting data from the database
    dbus.info.find(function(err, docs) {
        console.log(docs);
        res.json(docs);
    });

});

app.listen(3000);
console.log('Server running at http://localhost:3000');