const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const config = require('../configs/config.js');
const controllers = require('../controllers');

router.post('/', controllers.diary.add);

router.get('/', controllers.diary.add_view);

router.get('/login', controllers.login.login_view);

router.get('/login', controllers.login.login_view);

router.post('/login', controllers.login.login);

router.get('/logout', controllers.login.logout);

router.get('/notes/add', controllers.diary.add_note_view);

router.post('/notes/add', controllers.diary.add);

router.get('/notes/list', controllers.diary.list);

router.post('/notes/list', bodyParser.json(), controllers.diary.get_all);


module.exports = router;