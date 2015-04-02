"use strict";

// Project Information
const project = require('../package.json');
const personal = require('../personalSettings.json');

const express    = require('express');
const bodyParser = require('body-parser');
const app        = express();
const __         = require('underscore');
const path       = require('path');

const browserSync = require('browser-sync');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const router = express.Router();

//const hoge = require('./Hoge')(router);

app.use('/', router);

app.use(express.static(__dirname + '/../app'));

const port = personal.port === 'auto'   ? 4649
           : personal.port != undefined ? parseInt(personal.port, 10)
                                        : 4649;

app.listen(port, listening);

function listening(){
  browserSync({
    proxy: 'localhost:' + port,
    files: ['app/scripts/**/*.js', 'app/**/*.html']
  });
}



