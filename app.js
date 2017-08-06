var Koa = require('koa');
var Router = require('koa-router')();
var bodyParser = require('koa-bodyparser');
var ejs = require('koa-ejs');
var views = require('koa-views');
var static_ = require('koa-static');
var moment = require('moment');
var http = require('http');

var app = new Koa();
app.use(bodyParser());

app.use(static_(__dirname + '/app'));
app.use(views(__dirname + '/app/views', {
  extension: 'ejs',
  locals: {
    moment: moment
  }
}));


// SSE
require('./router/sse')(Router);
// scoket
var server = http.createServer(app.callback());
require('./router/socket')(server,Router);

app.use(Router.routes());

server.listen(18080);
console.log('running');

