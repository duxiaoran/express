require('dotenv').config();
var express = require('express');
var path = require('path');
var app = express();

var bodyParser = require('body-parser')
var mongoose = require('mongoose');
mongoose.set('debug', process.env.DEBUG);

app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

function header (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD");
  res.header('Access-Control-Allow-Headers',  'token');
  next();
}

app.use(header);


app.use('/user/v1', require('./controller/user/'));

app.use('/public/',express.static(path.join(__dirname, 'public')));


app.use('/ping', function(req, res){
  res.send("pang")
});

const handle_404 = function(req, res){
  res.json({
    code:404,
  })
};
app.use(handle_404)

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB, {}).then(function (db) {
  console.log('database connected!');
  var server = app.listen(process.env.PORT, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
  });
});

