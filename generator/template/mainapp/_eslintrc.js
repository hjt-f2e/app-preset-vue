module.exports = {
    root: true,
    parserOptions: {
        ecmaVersion: 2019,
        "parser": "babel-eslint"
    },
    env: {
        es6: true,
        node: true,
        browser: true,
        mocha: true
    },
    plugins: ['vue'],
    settings: {
        'import/resolver': {
            webpack: {
                config: 'node_modules/@vue/cli-service/webpack.config.js'
            },
            alias: {
                map: [
                    ['@', './src']
                ],
                extensions: ['.vue', '.js']
            },
        }
    },
    extends: [
        'airbnb-base',
        'eslint:recommended',
        'plugin:vue/recommended',
        'plugin:vue/strongly-recommended'
    ],
    // // add your custom rules here
    'rules': {
        // allow paren-less arrow functions
        'arrow-parens': 0,
        // allow async-await
        'generator-star-spacing': 0,
        "semi": ["error", "always"],
        'comma-dangle': ["error", "only-multiline"],
        'padded-blocks': 0,
        'one-var': 0,
        'no-return-assign': 0,
        'indent': ['error', 4],
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        'space-before-function-paren': 0,
        'no-useless-call': 0,
        'no-param-reassign': 0,

        'max-len': 0,
        'vue/max-len': 0,
        'vue/script-indent': ['error', 4, {
          'baseIndent': 1
        }],
        'vue/html-indent': ['error', 4, {
            'attribute': 1,
            'baseIndent': 1,
            'closeBracket': 0,
            'alignAttributesVertically': true,
            'ignores': []
        }],

        /*===================【关闭一些规则】================*/
        "vue/prop-name-casing": 0
    },
    'overrides': [
        {
          'files': ['*.vue'],
          'rules': {
            'indent': 'off'
          }
        }
    ]
};