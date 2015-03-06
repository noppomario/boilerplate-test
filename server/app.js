"use strict";

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

app.listen(4649);

