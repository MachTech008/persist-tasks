
// https://devcenter.heroku.com/articles/mongolab
// http://todomvc.com/examples/angularjs/#/
var express  = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var request = require('request');

express()
.use(bodyParser.json())
.use(bodyParser.urlencoded({ extended: true }))
.use(express.static(__dirname + '/'))
.get('/api', function (req, res) {
  res.json(200, {msg: 'OK'});
})
.listen(5000, function () {
  console.log('Example app listening on port 5000!')
});

var Schema = new mongoose.Schema({
    guid: String,
    title: String,
    username: String,
    priority: String,
    status: String,
    description: String,
    location: String,
    beaconId: String,
})

var Tasks = mongoose.model('Tasks', Schema);

mongoose.connect(process.env.MONGODB_URI, function (error) {
 if (error) {
  console.error(error);
 } else {
  console.log('mongo connected');
 }
});
