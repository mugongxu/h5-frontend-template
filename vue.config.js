/**
 * 自定义项目配置
 * 开发中用到的基本的配置项
 */
const path = require('path');
const resolve = dir => path.join(__dirname, dir);

const isProduction = process.env.NODE_ENV === 'production';
// const cdn = {
//     js: [
//         'https://unpkg.com/vue@2.6.11/dist/vue.min.js',
//         'https://unpkg.com/vue-router@3.1.6/dist/vue-router.min.js',
//         'https://unpkg.com/vuex@3.3.0/dist/vuex.min.js'
//     ]
// };

module.exports = {
    // 基于部署应用包时的基本URL
    publicPath: isProduction ? '/app/fund-comparison-h5' : '/',
    // outputDir: process.env.outputDir || 'dist', // 'dist', 生产环境构建文件的目录
    // assetsDir: ', // 相对于outputDir的静态资源(js、css、img、fonts)目录
    productionSourceMap: false,
    configureWebpack: config => {
        // cdn引入：在生成环境；暂时关闭，因为我们服务器没有设置cdn空间，如果使用unpkg的话，请求会失败
        // if (isProduction) {
        //     config.externals = {
        //         vue: 'Vue',
        //         'vue-router': 'VueRouter',
        //         vuex: 'Vuex'
        //     };
        // }
    },
    chainWebpack: config => {
        // 添加别名
        config.resolve.alias
            .set('vue$', 'vue/dist/vue.esm.js')
            .set('@', resolve('src'))
            .set('@apis', resolve('src/apis'))
            .set('@assets', resolve('src/assets'))
            .set('@scss', resolve('src/assets/scss'))
            .set('@components', resolve('src/components'))
            .set('@mixins', resolve('src/mixins'))
            .set('@plugins', resolve('src/plugins'))
            .set('@router', resolve('src/router'))
            .set('@store', resolve('src/store'))
            .set('@utils', resolve('src/utils'))
            .set('@views', resolve('src/views'));

        // code splitting
        config.optimization.splitChunks({
            cacheGroups: {
                vendors: {
                    name: 'chunk-vendors',
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    chunks: 'initial'
                },
                common: {
                    name: 'chunk-common',
                    minChunks: 2,
                    priority: -20,
                    chunks: 'initial',
                    reuseExistingChunk: true
                },
                // 将vue相关的单独拆分出来
                vue: {
                    name: 'vue',
                    test: /vue/,
                    priority: 20,
                    chunks: 'all'
                }
            }
        });

        // cdn资源配置：在生成环境
        if (isProduction) {
            config.plugin('html')
                .tap(args => {
                    // args[0].cdn = cdn;
                    args[0].title = '基金对比';
                    return args;
                });
        }

        // 打包分析
        if (isProduction) {
            if (process.env.npm_config_report) {
                config
                    .plugin('webpack-bundle-analyzer')
                    .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
                    .end();
                config.plugins.delete('prefetch');
            }
        }

        // 区分线下环境和线上环境，从而在项目中通过process.env.[字段名]来引用配置
        config.plugin('define').tap(args => {
            let env = args[0]['process.env'];
            env.fortuneUrl = `"${process.env.fortuneUrl}"`;
            env.fortuneKey = `"${process.env.fortuneKey}"`;
            return args;
        });
    },
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: true,
        // 开启 CSS source maps?
        sourceMap: false,
        loaderOptions: {
            scss: {
                // 向全局sass样式传入共享的全局变量, $src可以配置图片cdn前缀
                // 详情: https://cli.vuejs.org/guide/css.html#passing-options-to-pre-processor-loaders
                prependData: `
                    @import '@scss/variables.scss';
                    @import '@scss/mixins.scss';
                    @import '@scss/function.scss';
                    $src: '${process.env.VUE_APP_BASE_API}';`
            },
            postcss: {
                plugins: [
                    // 将特定css属性的px转化为rem
                    require('postcss-pxtorem')({
                        rootValue: 100,
                        propList: ['font', 'font-size', 'line-height', 'letter-spacing', 'height']
                    })
                ]
            },
            less: {
                lessOptions: {
                    modifyVars: {
                      // 可以通过 less 文件覆盖（文件路径为绝对路径）
                      hack: 'true; @import "@assets/less/vant.less";'
                    }
                }
            }
        }
    },
    devServer: {
        // 让浏览器 overlay 同时显示警告和错误
        overlay: {
            warnings: true,
            errors: true
        },
        // open: false, // 是否打开浏览器
        host: '0.0.0.0',
        port: '8280', // 代理端口
        // https: false,
        hotOnly: true, // 热更新
        proxy: {
            '/fortune': {
                target: `${process.env.PROXY_TARGET}`, // 目标代理接口地址
                // secure: false,
                // changeOrigin: true, // 开启代理，在本地创建一个虚拟服务端
                // // ws: true, // 是否启用websockets
                // pathRewrite: {
                //     '^/api': '/'
                // }
            }
        }
    },
    // 构建时开启多进程处理 babel 编译
    parallel: require('os').cpus().length > 1,
    // https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    pwa: {},
    // 第三方插件配置
    pluginOptions: {}
};
