const path = require('path');
const AutoImport = require('unplugin-auto-import/webpack');
const Components = require('unplugin-vue-components/webpack');
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers');

function resolve(dir) {
    return path.join(__dirname, dir);
}

const name = '<%= rootOptions.projectName %>'; // page title
const port = 8081;

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
            errors: true,
        },
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
    },

    configureWebpack: {
        name,
        resolve: {
            alias: {
                '@': resolve('src'),
            },
        },
        // 区分子应用打包
        output: {
            library: '<%= options.appName %>',
            libraryTarget: 'umd',
        },
        // 按需导入(自动导入)
        plugins: [
            AutoImport({
                resolvers: [ElementPlusResolver()],
            }),
            Components({
                resolvers: [ElementPlusResolver()],
            }),
        ],
    },
};
