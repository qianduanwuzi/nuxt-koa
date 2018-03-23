import Koa from 'koa'
import { Nuxt, Builder } from 'nuxt'
import router from './service/position'
// const MIDDLEWARES = ['database','common','router']
const cors = require('koa2-cors')
const config = require('../nuxt.config.js')
config.dev = !(process.env === 'production')

const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000
// es6 class
class Server {
  constructor () {
    this.app = new Koa()
    // this.app.use(cors ({
    //   origin: function(ctx) {
    //     if (ctx.url === '/test') {
    //         return "*"; // 允许来自所有域名请求
    //     }
    //     return 'http://localhost:3000';  // 这样就能只允许 http://localhost:3000 这个域名的请求了
    //   },
    //   exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    //   maxAge: 5,
    //   credentials: true,
    //   allowMethods: ['GET', 'POST', 'DELETE'],
    //   allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
    // }))
    // this.useMiddleWares(this.app)(MIDDLEWARES)
  }

  // useMiddleWares (app) {
  //   return R.map(R.compose(
  //     R.map(i => i(app)),
  //     require,
  //     i => `${r('./middlewares')}/${i}`
  //   ))
  // }

  async start () {
    console.log('-----------', 1)
    this.app.use(router.routes())
    console.log('-----------', 2)
    const nuxt = new Nuxt(config)
    // Build in development
    if (config.dev) {
      const builder = new Builder(nuxt)
      await builder.build()
    }
    setTimeout(() => {
      console.log('-----------', 8)
    }, 2000)
    this.app.use(async (ctx, next) => {
      console.log('-----------', 3)
      await next()
      console.log('-----------', 4)
      ctx.status = 200 // koa defaults to 404 when it sees that status is unset
      return new Promise((resolve, reject) => {
        ctx.res.on('close', resolve)
        ctx.res.on('finish', resolve)
        nuxt.render(ctx.req, ctx.res, promise => {
          // nuxt.render passes a rejected promise into callback on error.
          promise.then(resolve).catch(reject)
        })
      })
    })
    this.app.use(async (ctx, next) => {
      console.log('-----------', 6)
      await next()
      console.log('-----------', 7)
    })
    // this.app.proxy = true;
    console.log('-----------', 5)
    // this.app.use(router.routes())
    this.app.listen(port, host)
    console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
  }

}
const app = new Server()
app.start()
