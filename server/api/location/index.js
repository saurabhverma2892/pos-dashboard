'use strict';

var express = require('express');
var controller = require('./location.controller');
import * as auth from '../../auth/auth.service';


var router = express.Router();

router.get('/:id',auth.isAuthenticated(), controller.show);


module.exports = router;
