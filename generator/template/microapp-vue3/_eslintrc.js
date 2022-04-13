module.exports = {
    root: true,
    env: {
        es6: true,
        node: true,
        browser: true,
    },
    extends: [
        'plugin:vue/vue3-essential',
        '@vue/airbnb',
        '@vue/typescript/recommended',
    ],
    parserOptions: {
        ecmaVersion: 2020
    },
    rules: {
        // allow paren-less arrow functions
        'arrow-parens': 0,
        // allow async-await
        'generator-star-spacing': 0,
        semi: ['error', 'always'],
        'comma-dangle': ['error', 'only-multiline'],
        'padded-blocks': 0,
        'one-var': 0,
        indent: ['error', 4],
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        'space-before-function-paren': 0,
        'no-useless-call': 0,
        // 'no-param-reassign': 0,

        'max-len': 0,
        'vue/max-len': 0,
        'vue/html-indent': ['error', 4, {
            attribute: 1,
            baseIndent: 1,
            closeBracket: 0,
            alignAttributesVertically: true,
            ignores: []
        }],

        /*= ==================【关闭一些规则】================ */
        'import/extensions': [
            'error',
            'ignorePackages',
            {
              js: 'never',
              jsx: 'never',
              ts: 'never',
              tsx: 'never'
            }
        ]
    },
};
