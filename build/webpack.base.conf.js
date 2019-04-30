var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var postcssrc = require('../.postcssrc')
var webpack = require('webpack')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const vuxLoader = require('vux-loader')
const webpackConfig = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath:
      process.env.NODE_ENV === 'production'
        ? config.build.assetsPublicPath
        : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@store': path.join(__dirname, '..', 'src', 'store'),
      '@css': path.join(__dirname, '..', 'src/assets/css'),
      '@js': path.join(__dirname, '..', 'src/assets/js'),
      '@image': path.join(__dirname, '..', 'src/assets/image'),
      '@views': path.join(__dirname, '..', 'src', 'views'),
      '@comps': path.join(__dirname, '..', 'src', 'components'),
      '@api': path.join(__dirname, '..', 'src', 'api'),
      '@router': path.join(__dirname, '..', 'src', 'router'),
      '@config': path.join(__dirname, '..', 'src', 'config'),
      '@utils': path.join(__dirname, '..', 'src', 'utils'),
      Assets: resolve('src/assets'),
      Components: resolve('src/components'),
      Common: resolve('src/components/Common'),
      Lib: resolve('src/lib'),
      Plugins: resolve('src/plugins'),
      Store: resolve('src/store'),
      Views: resolve('src/views')
    }
  },
  // 添加代码
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      jquery: 'jquery',
      'window.jQuery': 'jquery'
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1024,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 5000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 5000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  externals: {
    BMap: 'BMap',
    AMap: 'AMap'
  }
}

module.exports = vuxLoader.merge(webpackConfig, {
  plugins: [
    'vux-ui',
    'progress-bar',
    'duplicate-style',
    {
      name: 'less-theme',
      path: 'src/assets/style/vux-theme.less'
    },
    {
      name: 'after-less-parser',
      fn: function (source) {
        if (
          this.resourcePath.replace(/\\/g, '/').indexOf('vux/src/components') >
          -1
        ) {
          let result = source.match(/\d+px/g) || []
          for (let px of result) {
            let pxVal = px.substr(0, px.length - 2)
            let remVal =
              (parseFloat(pxVal) * 2) /
              parseFloat(postcssrc.plugins['postcss-px2rem'].remUnit)
            let rem = remVal.toFixed(6) + 'rem'
            source = source.replace(px, rem)
          }
          source = source.replace('0.026667rem.less', '1px.less')
        }

        return source
      }
    },
    {
      name: 'style-parser',
      fn: function (source) {
        if (
          this.resourcePath.replace(/\\/g, '/').indexOf('vux/src/components') >
          -1
        ) {
          let result = source.match(/\d+px/g) || []
          for (let px of result) {
            let pxVal = px.substr(0, px.length - 2)
            let remVal =
              (parseFloat(pxVal) * 2) /
              parseFloat(postcssrc.plugins['postcss-px2rem'].remUnit)
            let rem = remVal.toFixed(6) + 'rem'
            source = source.replace(px, rem)
          }
          source = source.replace('0.026667rem.less', '1px.less')
        }

        if (
          this.resourcePath.replace(/\\/g, '/').indexOf('/components/Common') >
            -1 ||
          this.resourcePath.replace(/\\/g, '/').indexOf('/views/backstage') > -1
        ) {
          let result = source.match(/\d+px/g) || []
          for (let px of result) {
            let pxVal = px.substr(0, px.length - 2)
            let remVal =
              parseFloat(pxVal * 2) /
              parseFloat(postcssrc.plugins['postcss-px2rem'].remUnit)
            let rem = remVal.toFixed(6) + 'rem'
            source = source.replace(px, rem)
          }
          source = source.replace('0.026667rem.less', '1px.less')
        }
        return source
      }
    }
  ]
})
