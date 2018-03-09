const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const config = require('../configs/config.js');
const controllers = require('../controllers');
const acl = require('../helpers/acl_helper');

router.post('/', acl, controllers.diary.add);

router.get('/', acl, controllers.diary.add_view);

router.get('/login', controllers.login.login_view);

router.post('/login', controllers.login.login);

router.get('/logout', controllers.login.logout);

router.get('/notes/add', acl, controllers.diary.add_note_view);

router.post('/notes/add', acl, controllers.diary.add);

router.get('/notes/list', acl, controllers.diary.list);

router.post('/notes/list', acl, bodyParser.json(), controllers.diary.get_all);

module.exports = router;