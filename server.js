var express  = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var fs = require('fs');

var baseConnectWorkerURL = 'http://ec2-52-26-69-118.us-west-2.compute.amazonaws.com/api/v1/';

var app = express()
  app.use(bodyParser.json()) 
  app.use(bodyParser.urlencoded({ extended: true }))

  app.get('/api', function (req, res) {
    res.json(200, {msg: 'OK'});
  })

  app.get('/api/getCredentials', function (req, res) {
    request.get(baseConnectWorkerURL + 'credentials', function (error, response, body) {
      body = JSON.parse(body);
      for(var i = 0; i < body.length; i++) {
        if (body[i].token === 'DummyToken1') {
        console.log('credentials found');
        } else {
        console.log('credentials not found');
        var update = {
          url: baseConnectWorkerURL + 'credentials',
          method: 'POST',
          json: {
            token: 'DummyToken1'
          }
        };
        
        request(update, function (error, response, body1) {
          if (error) {
            console.log(error);
          } else {
            console.log('success');
          }
        })
      }
    }
  })
    res.json(200, {msg: 'OK'});
  })

  app.get('/api/getLocations' , function (req, res) {
    request.get(baseConnectWorkerURL + 'locations', function (error, response, body) { 
      body = JSON.parse(body);
      for (var i = 0; i < body.length; i++) {
        if (body[i].name === '101') {
          console.log('room 101 found');
        } else {
         
          var update = {
            url: baseConnectWorkerURL + 'locations',
            method: 'POST',
            json: {
              name: '101'
            }
          };

          request(update, function(error, response, body1) {
            if (error) {
              console.log(error);
            }
          });
        }

        if (body[i].name === '102') {
          console.log('room 102 found');
        } else {
          var update = {
            url: baseConnectWorkerURL + 'locations',
            method: 'POST',
            json: {
              name: '102'
            }
          };

          request(update, function(error, response, body1) {
            if (error) {
              console.log(error);
            }
          });
        }

        if (body[i].name === '103') {
          console.log('room 103 found');
        } else {
          var update = {
            url: baseConnectWorkerURL + 'locations',
            method: 'POST',
            json: {
              name: '103'
            }
          };

          request(update, function(error, response, body1) {
            if (error) {
              console.log(error);
            }
          });
        }

        if (body[i].name === '104') {
          console.log('room 104 found');
        } else {
          var update = {
            url: baseConnectWorkerURL + 'locations',
            method: 'POST',
            json: {
              name: '104'
            }
          };

          request(update, function(error, response, body1) {
            if (error) {
              console.log(error);
            }
          });
        }
      }
    })

    res.json(200, {msg: 'OK'});
  })
  app.get('/api/getTaskTypes', function(req, res) {
    request.get(baseConnectWorkerURL + 'taskTypes', function (error, response, body) {
      body = JSON.parse(body);
      for (var i = 0; i < body.length; i++) {
        if (body[i].title === 'Housekeeping Request') {
            console.log('Housekeeping Request task type found');
            res.json(200, {msg: 'OK'});
        } else {
          console.log('not found');
          var update1 = {
            url: baseConnectWorkerURL + 'tasktypes',
            method: 'POST',
            json: {
              title: 'Housekeeping Request',
            }
          };

          var update = {
            url: baseConnectWorkerURL + 'taskTypes',
            method: 'POST',
            json: {
              title: 'Housekeeping Request'
            }
          };

          request(update, function(error, response, body1) {
            if (error) {
              console.log(error);
            } else {
              console.log('Housekeeping tasktype updated!');
            }
          });
        }

        if (body[i].title === 'Maintenance Request') {
          console.log('Maintenance Request task type found');
              res.json(200, {msg: 'OK'});
        } else {
          var update1 = {
            url: baseConnectWorkerURL + 'tasktypes',
            method: 'POST',
            json: {
              title: 'Maintenance Request'
            }
          };

          request(update1, function(error, response, body1) {
            if (error) {
              console.log(error);
            } else {
              console.log('Maintenance Request tasktype updated!');
            }
          });
        }  
      }
    })
    res.json(200, {msg: 'OK'});
  })
  app.get('/api/getUsers', function (req, res) {
    request.get(baseConnectWorkerURL + 'users', function (error, response, body) {
      body = JSON.parse(body);
      for(var i = 0; i < body.length; i++) {
        if (body[i].name === 'Laure Linn') {
          console.log('User found');

        } else {
          console.log('User not found');
          var update = {
            url: baseConnectWorkerURL + 'users',
            method: 'POST',
            json: {
              name: 'Laure Linn',
              credentials: 'DummyToken1' 
            }
          };

          request(update, function (error, response, body1) {
            if (error) {
              console.log(error);
            } else {
              console.log('users updated');
            }
          });
        }
      }
    })
    res.json(200, {msg: 'OK'});
  })
  app.use(express.static(__dirname + '/'))
  app.listen(process.env.PORT || 5000);




