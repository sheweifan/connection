
var PassThrough = require('stream').PassThrough;

module.exports = (Router)=>{

	Router.get('/sse',async (ctx)=>{
	  await ctx.render('pages/sse', {
	    title: 'sse test'
	  })
	});

	Router.get('/sseData',async (ctx)=>{
    ctx.type = 'text/event-stream';
    // 参考 https://github.com/koajs/koa/issues/543
    var body = ctx.body = new PassThrough();
    interval = setInterval(()=>{
        body.write(`event:fuck\ndata: ${new Date()} fuck \n\n`)
        body.write(`event:message\ndata: ${new Date().getTime()} message \n\n`)
    }, 1000);

    ctx.req.on('close', ()=>{
      ctx.res.end();
      clearInterval(interval);
    });

	});
}