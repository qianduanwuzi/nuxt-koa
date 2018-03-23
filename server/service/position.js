const Router = require('koa-router');
var router = new Router({
  prefix: '/mall'
});

router.get('/getLocate', (ctx, next) => {
  console.log('----', ctx.ip)
  // ctx.body = JSON.stringify({"status": 200, "res": "success"})
  ctx.body = {"status": 200, "res": "success"}
  next()
  // ctx.body = 'hello world'
  // await next()
});

router.get('/getLocate', (ctx, next) => {
  console.log('+++++', ctx.ip)
  // ctx.body = JSON.stringify({"status": 200, "res": "success"})
  ctx.body = {"status": 200, "res": "fail"}
  next()
  // ctx.body = 'hello world'
  // await next()
});

module.exports = router;
