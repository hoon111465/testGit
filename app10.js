/*jshint node:true */
/* global require */

var express = require('express'),
    http = require('http'),
    path = require('path'),
    bodyParser = require('body-parser'),
    static = require('serve-static');

var app = express(),
    router = express.Router();


app.set('port', process.env.PORT || 3000);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(static(path.join(__dirname, 'public')));

router.route('/process/users/:id').get(function(req, res) {
    console.log('/process/users/:id 처리함');
    
    var paramId = req.params.id;
    
    console.log('/prpcess/users와 토큰 %s를 이용해 처리함.', paramId);
    
    res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
    res.write('<h1>Express 서버에서 응답한 결과입니다.</h1>');
    res.write('<div><p>Param Id : ' + paramId + '</p></div>');
    res.end();
});

app.use('/', router);

http.createServer(app).listen(3000, function() {
    console.log('Express 서버가 3000번 포트에서 시작됨.');
});
