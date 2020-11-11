const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir);
}

const name = '{{name}}'; // page title

const port = 9528;

module.exports = {
    publicPath: '/',
    outputDir: 'dist',
    assetsDir: 'static',
    lintOnSave: process.env.NODE_ENV === 'development',
    productionSourceMap: process.env.NODE_ENV !== 'production',

    // 开发环境配置
    devServer: {
        port,
        open: false,
        overlay: {
            warnings: false,
            errors: true
        },
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        // proxy: {}
    },

    configureWebpack: {
        name,
        resolve: {
            alias: {
                '@': resolve('src')
            }
        }
    },

    chainWebpack(config) {
        config.when(process.env.NODE_ENV !== 'development', conf => {
            // 代码分割
            conf.optimization.splitChunks({
                chunks: 'all',
                cacheGroups: {
                    libs: {
                        name: 'chunk-libs',
                        test: /[\\/]node_modules[\\/]/,
                        priority: 10,
                        chunks: 'initial' // only package third parties that are initially dependent
                    },
                    antdUI: {
                        name: 'chunk-antd',
                        test: /[\\/]node_modules[\\/]_?ant-design-vue(.*)/,
                        priority: 20
                    }
                }
            });
            conf.optimization.runtimeChunk('single');
        });
    }
};
