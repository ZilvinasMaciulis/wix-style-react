/* eslint no-console: 0 */

const path = require('path');
const webpack = require('webpack');
const { tryRequire } = require('yoshi-helpers/utils');
const { createClientWebpackConfig } = require('yoshi/config/webpack.config');

const config = createClientWebpackConfig({ isDebug: true });

const ROOT_DIR = process.cwd();
const resolvePath = (...args) => path.resolve(ROOT_DIR, ...args);
const components_meta = require(resolvePath('.wuf/components.json'));

const components = Object.keys(components_meta).reduce(
  (accu, comp) => ({
    ...accu,
    [comp]: `${components_meta[comp].path.replace('src/', '')}/index`,
  }),
  {},
);

webpack(
  {
    ...config,
    context: resolvePath('dist'),
    entry: {
      ...components,
    },
    devtool: 'source-map',
    externals: {
      react: 'react',
      'react-dom': 'reactDOM',
    },
    output: {
      filename: '[name].js',
      path: resolvePath('bundles'),
    },
    module: {
      rules: [
        ...config.module.rules,
        {
          test: /\.(scss|sass)$/,
          loader: 'yoshi-style-dependencies/sass-loader',
          options: {
            sourceMap: true,
            implementation: tryRequire('yoshi-style-dependencies/node-sass'),
            includePaths: ['node_modules', 'node_modules/compass-mixins/lib'],
          },
        },
      ],
    },

    plugins: [...config.plugins],
  },
  errorHandler,
);

function errorHandler(err, stats) {
  if (err) {
    console.error(err.stack || err);
    if (err.details) {
      console.error(err.details);
    }
    return;
  }

  const info = stats.toJson();

  if (stats.hasErrors()) {
    console.error(info.errors);
  }

  if (stats.hasWarnings()) {
    console.warn(info.warnings);
  }
}
