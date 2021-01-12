const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir);
}

const name = '<%= rootOptions.projectName %>'; // page title

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
                    <%_ if (options.uiframework === 'antd') { _%>
                    antdUI: {
                        name: 'chunk-antd',
                        test: /[\\/]node_modules[\\/]_?ant-design-vue(.*)/,
                        priority: 20
                    }
                    <%_ } _%>
                    <%_ if (options.uiframework === 'element') { _%>
                    elementUI: {
                        name: 'chunk-elementUI',
                        test: /[\\/]node_modules[\\/]_?element-ui(.*)/,
                        priority: 20
                    }
                    <%_ } _%>
                }
            });
            conf.optimization.runtimeChunk('single');
        });
    }
};
