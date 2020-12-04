# ins-order-list-center-front

## Project setup
```
npm install
npm run serve
npm run build
npm run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 项目简介
INS用户订单中心

### 实现思路
由INS产品中心(ins-prod-list-center-front)为入口，通过特定位置进入产品中心当前登录用户的订单中心。

#### 登录鉴权
1. 获取产品中心当前用户token，跳转：订单中心/#/login?token=当前用户token
2. 订单中心缓存token，localStorage->token
3. 已该token为接口鉴权凭证

#### UI
使用Vant，[具体配置查看](https://vant-contrib.gitee.io/vant/#/zh-CN/home)

这里主要注意两点：

1. vant内部css使用px，我们的项目使用的是rem，所以我们需要把px转化为rem
```js
// vue.config.js
// 借助插件：postcss-pxtorem将px转化为rem，注意这里是会把项目里所有匹配propList里的属性的px转换成rem
postcss: {
    plugins: [
        // 将特定css属性的px转化为rem
        require('postcss-pxtorem')({
            rootValue: 100,
            propList: ['font', 'font-size', 'line-height', 'letter-spacing', 'height']
        })
    ]
},
```

2. 主题色自定义
```js
// vue.config.js
less: {
    lessOptions: {
        modifyVars: {
          // 可以通过 less 文件覆盖（文件路径为绝对路径）
          hack: 'true; @import "@assets/less/vant.less";'
        }
    }
}
```

3. 财富APP配置

区分开发环境(development)和生产环境(production)
Vue环境模式model为：`development`、`production`、`test`，可以在`package.json`的script里，通过`--mode`l进行自定义名字。eg："build": "vue-cli-service build --model prod";

vue.config.js里的process.env可通过在项目目录下，添加文件.env.【model的名字】对不同model环境下添加在vue.config.js使用的通用配置。

如果要在全局组件或js中使用不同环境的配置：可借助`webpack.DefinePlugin`
。
因为vue已经包含了DefinePlugin插件，所以需要通过chainWebpack来设置:
```js
chainWebpack: config => {
  config.plugin('define').tap(args => {
      let env = args[0]['process.env'];
      env.fortuneUrl = `"${process.env.fortuneUrl}"`;
      env.fortuneKey = `"${process.env.fortuneKey}"`;
      return args;
  });
},
```
这样就可以在全局（组件或全局js）通过process.env来获取访问。
