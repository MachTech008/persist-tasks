
// https://devcenter.heroku.com/articles/mongolab
// http://todomvc.com/examples/angularjs/#/
var express  = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var request = require('request');

var uri = process.env.MONGODB_URI || 'mongodb://lylyn:accenture1@ds151917.mlab.com:51917/persist-tasks';

var Schema = new mongoose.Schema({
  guid: String,
  title: String,
  username: String,
  priority: String,
  status: String,
  description: String,
  location: String,
  creationTime: String,
  deleted: Boolean

});

var Tasks = mongoose.model('Tasks', Schema);

mongoose.connect(uri, function (error) {
 if (error) {
  console.error(error);
 } else {
  console.log('mongo connected');
 }
});

express()
  // https://scotch.io/tutorials/use-expressjs-to-get-url-and-post-parameters
  .use(bodyParser.json()) // support json encoded bodies
  .use(bodyParser.urlencoded({ extended: true })) // support encoded bodies
  
  .get('/api', function (req, res) {
    res.json(200, {msg: 'OK'});
  })
  
  .get('api/tasks', function (req, res) {

  })

  .use(express.static(__dirname + '/'))
  .listen(process.env.PORT || 5000);



