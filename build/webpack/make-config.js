import assign from 'object-assign';
import webpack from 'webpack';
import {
  NODE_ENV,
  inProject,
  inSrc,
  SRC_DIRNAME,
  __DEV__,
  __PROD__
} from '../../config';

function makeDefaultConfig () {
  const config = {
    output : {
      filename : '[name].[hash].js'
    },
    target  : 'web',
    plugins : [
      new webpack.DefinePlugin({
        'process.env' : {
          'NODE_ENV' : JSON.stringify(NODE_ENV)
        },
        '__DEV__'  : __DEV__,
        '__PROD__' : __PROD__
      }),
      new webpack.optimize.DedupePlugin()
    ],
    resolve : {
      extensions : ['', '.js'],
      alias : {
        actions     : inSrc('actions'),
        components  : inSrc('components'),
        constants   : inSrc('constants'),
        dispatchers : inSrc('dispatchers'),
        models      : inSrc('models'),
        services    : inSrc('services'),
        stores      : inSrc('stores'),
        styles      : inSrc('styles'),
        views       : inSrc('views')
      }
    },
    module : {
      loaders : [{
        test : /\.(js|jsx)?$/,
        include : inProject(SRC_DIRNAME),
        loaders : ['babel?optional[]=runtime&stage=0']
      },
      {
        test : /\.hbs?$/,
        include : inProject(SRC_DIRNAME),
        loaders : ['handlebars']
      },{
          test: /\.jpe?g$|\.gif$|\.png$|\.svg$/,
          loader: 'file?name=assets/images/[name].[ext]'
      }]
    },
    eslint : {
      configFile : inProject('.eslintrc'),
      fairlOnError : __PROD__
    }
  };

  // ----------------------------------
  // Environment-Specific Defaults
  // ----------------------------------
  if (__DEV__) {
    config.plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    );
  }

  if (__PROD__) {
    config.plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        output : {
          'comments'  : false
        },
        compress : {
          'unused'    : true,
          'dead_code' : true
        }
      })
    );
  }

  return config;
};

export default (config) => assign({}, makeDefaultConfig(), config);
