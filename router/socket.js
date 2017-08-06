var socketIo = require('socket.io');

module.exports = (server,Router)=>{
  var io = socketIo(server);

	Router.get('/socket',async (ctx)=>{
	  await ctx.render('pages/socket', {
	    title: 'socket test'
	  })
	});

	io.on('connection', function (socket) {
	  socket.emit('news', { hello: 'world' });
	  socket.on('send', function (data) {
	    console.log(data);
	    // 广播：除了自己
	    socket.broadcast.emit('take',data)
	    // 广播：全部
	    // io.sockets.emit('take',data)
	  });
	});

}