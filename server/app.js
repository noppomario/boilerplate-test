"use strict";

// Project Information
var project = require('../package.json');
var personal = require('../personalSettings.json');

var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var __         = require('underscore');
var path       = require('path');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var router = express.Router();

//var hoge = require('./Hoge')(router);

app.use('/', router);

app.use(express.static(__dirname + '/../app'));

var port = 'auto';
if ( personal.port != undefined ){
  port = personal.port;
}
if ( port === 'auto' ){
  port = '4649';
}
port = parseInt(port,10);

app.listen(port);

