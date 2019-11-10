/*jshint node:true */
/* global require */

var express = require('express'),
    http = require('http'),
    path = require('path'),
    bodyParser = require('body-parser'),
    static = require('serve-static'),
    cookieParser = require('cookie-parser');


var app = express(),
    router = express.Router();
app.use(express.cookieParser());

app.set('port', process.env.PORT || 3000);



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(static(path.join(__dirname, 'public')));

router.route('/process/showCookie').get(function(req, res) {
    console.log('/process/showCookie 호출됨');
    
    res.send(req.cookies);
});

router.route('/process/setUserCookie').get(function(req, res) {
    console.log('/process/setUserCookie 호출됨');
    
    res.cookie('user',{
        id:'mike',
        name:'소녀시대',
        authorized: true
    });
    res.redirect('/process/showCookie');
});

app.use('/', router);

http.createServer(app).listen(3000, function() {
    console.log('Express 서버가 3000번 포트에서 시작됨.');
});
