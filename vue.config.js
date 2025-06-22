const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  
  // 开发服务器配置
  devServer: {
    port: 8080,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api'
        }
      }
    }
  },

  // 构建配置
  configureWebpack: {
    resolve: {
      alias: {
        '@': require('path').resolve(__dirname, 'src')
      }
    }
  },

  // CSS配置
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";`
      }
    }
  },

  // 生产环境配置
  productionSourceMap: false,

  // 输出目录
  outputDir: 'dist',

  // 静态资源目录
  assetsDir: 'static',

  // 公共路径
  publicPath: process.env.NODE_ENV === 'production' ? '/admin/' : '/',

  // 链式配置
  chainWebpack: config => {
    // 设置标题
    config.plugin('html').tap(args => {
      args[0].title = '房产中介管理系统'
      return args
    })

    // 优化图片 - 修复options可能为undefined的问题
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => {
        if (options) {
          return Object.assign(options, { limit: 10240 })
        }
        return { limit: 10240 }
      })
  }
}) 