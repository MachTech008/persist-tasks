var express  = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var fs = require('fs');

var baseConnectWorkerURL = 'http://ec2-52-26-69-118.us-west-2.compute.amazonaws.com/api/v1/';

express()
  .use(bodyParser.json()) 
  .use(bodyParser.urlencoded({ extended: true }))

  .get('/api', function (req, res) {
    res.json(200, {msg: 'OK'});
  })

  .get('/api/getUsers', function (req, res) {

    request.get(baseConnectWorkerURL + 'users', function (error, response, body) {
      body = JSON.parse(body);
      if (body.indexOf('Laure Linn')) {
        console.log('user found');

      } else {
        
        console.log('user not found');

        var update = {
          url: baseConnectWorkerURL + 'users',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          json: {
            name: 'Laure Linn',
            credentials: 'DummyToken1' 
          }
        };

        request(update, function (error, response, body) {
          if (error) {
            console.log(error);
          } else {
            res.send(body)
          }
        });
      }
    })
  })

  .get('/api/getCredentials', function (req, res) {
    request.get(baseConnectWorkerURL + 'credentials', function (error, response, body) {
      body = JSON.parse(body);

      if (body.indexOf('DummyToken1')) {

        console.log('credentials found');

      } else {

        console.log('credentials not found');

        var update = {
          url: baseConnectWorkerURL + 'credentials',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          json: {
            token: 'DummyToken1'
          }
        };

        request(update, function (error, response, body) {
          if (error) {
            console.log(error);
          } else {
            res.send(body);
          }
        })
      }
    })
  })

  .get('/api/getLocations' , function (req, res) {
    request.get(baseConnectWorkerURL + 'locations', function (error, response, body) {
      body = JSON.parse(body);
      var rooms = [];

      for (var i = 0; i < body.length; i++) {
        rooms.push(body[i].name)

        if(!rooms.indexOf('101') || (!rooms.indexOf('102')) || (!rooms.indexOf('103')) || (!rooms.indexOf('104'))) {
          
          console.log(error);
          var locations = ['101', '102', '103', '104'];

          for (var i = 0; i < locations.length; i++ ){
            
            var update = {
              url: baseConnectWorkerURL + 'locations',
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
              json: {
                name: locations[i]
              }
            };

            request(update, function(error, response, body) {
              if (error) {
                console.log(error);
              } else {
                res.send(body)
              }
            })
          }
        } else {
          console.log('locations found');
        }
      }
    })
  })
  .use(express.static(__dirname + '/'))
  .listen(process.env.PORT || 5000);



