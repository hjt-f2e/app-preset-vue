module.exports = (api, options, rootOptions) => {
    const pkg = {
        "private": true,
        "scripts": {
            "dev": "vue-cli-service serve",
            "build:prod": "vue-cli-service build",
            "build:stage": "vue-cli-service build --mode staging",
            "changelog": "conventional-changelog -p angular -i CHANGELOG.md -s",
            "commit": "git cz",
            "lintfix": "eslint --fix --ext .js ./src",
            "init": "node ./build/init.js"
        },
        "devDependencies": {
            "@babel/plugin-proposal-optional-chaining": "^7.12.1",
            "@commitlint/cli": "^11.0.0",
            "@commitlint/config-conventional": "^11.0.0",
            "@vue/cli-plugin-babel": "~4.5.0",
            "@vue/cli-plugin-eslint": "~4.5.0",
            "@vue/cli-service": "~4.5.0",
            "babel-eslint": "^10.1.0",
            "commitizen": "^4.2.2",
            "conventional-changelog-cli": "^2.1.0",
            "cz-conventional-changelog": "^3.3.0",
            "eslint": "^6.7.2",
            "eslint-config-airbnb-base": "^14.2.0",
            "eslint-import-resolver-alias": "^1.1.2",
            "eslint-import-resolver-webpack": "^0.13.0",
            "eslint-plugin-import": "^2.22.1",
            "eslint-plugin-vue": "^6.2.2",
            "husky": "^4.3.0",
            "lint-staged": "^10.5.1",
            "node-sass": "^5.0.0",
            "sass-loader": "^10.0.4",
            "vue-template-compiler": "^2.6.11"
        },
        "browserslist": [
            "> 1%",
            "last 2 versions",
            "not dead"
        ],
        "config": {
            "commitizen": {
                "path": "./node_modules/cz-conventional-changelog"
            }
        },
        "commitlint": {
            "extends": [
                "@commitlint/config-conventional"
            ],
            "rules": {
                "type-enum": [
                    2,
                    "always",
                    [
                        "feat",
                        "fix",
                        "docs",
                        "style",
                        "refactor",
                        "test",
                        "revert",
                        "config",
                        "chore"
                    ]
                ],
                "type-empty": [
                    2,
                    "never"
                ],
                "subject-empty": [
                    2,
                    "never"
                ],
                "subject-full-stop": [
                    0,
                    "never"
                ],
                "subject-case": [
                    0,
                    "never"
                ]
            }
        },
        "husky": {
            "hooks": {
                "pre-commit": "lint-staged",
                "commit-msg": "commitlint -e $HUSKY_GIT_PARAMS"
            }
        }
    };

    if (options.template === 'microapp') {
        const packageJson = Object.assign({
            "dependencies": {
                "axios": "^0.21.0",
                "core-js": "^3.6.5",
                "js-cookie": "^2.2.1",
                "js-md5": "^0.7.3",
                "normalize.css": "^8.0.1",
                "nprogress": "^0.2.0",
                "qiniu-js": "^3.1.1",
                "urijs": "^1.19.2",
                "vue": "^2.6.11",
                "vue-router": "^3.4.9",
                "vuex": "^3.5.1",
                "vuex-persist": "^3.1.3"
            }
        }, pkg);

        if (options.uiframework === 'antd') {
            packageJson.dependencies[ "ant-design-vue"] = "^1.7.1";
        } else {
            packageJson.dependencies[ "element-ui"] = "^2.14.1";
        }

        api.extendPackage(() => packageJson);
    } else if (options.template === 'mainapp') {
        const packageJson = Object.assign({
            "dependencies": {
                "axios": "^0.21.0",
                "core-js": "^3.6.5",
                "js-cookie": "^2.2.1",
                "normalize.css": "^8.0.1",
                "qiankun": "2.0.25",
                "urijs": "^1.19.2",
                "vue": "^2.6.11",
                "vue-router": "^3.4.8",
                "vuex": "^3.5.1",
                "vuex-persist": "^3.1.3"
            }
        }, pkg);

        if (options.uiframework === 'antd') {
            packageJson.dependencies[ "ant-design-vue"] = "^1.7.1";
        } else {
            packageJson.dependencies[ "element-ui"] = "^2.14.1";
        }

        api.extendPackage(() => packageJson);
    } else if (options.template === 'microappvue3') {
        const pkg = {
            "private": true,
            "scripts": {
                "dev": "vue-cli-service serve",
                "build:pre": "vue-cli-service build --mode pre",
                "build:prod": "vue-cli-service build --mode prod",
                "build:stage": "vue-cli-service build --mode staging",
                "lint": "vue-cli-service lint"
            },
            "dependencies": {
                "@element-plus/icons-vue": "^1.1.4",
                "axios": "^0.26.0",
                "core-js": "^3.6.5",
                "element-plus": "^2.1.7",
                "js-cookie": "^3.0.1",
                "normalize.css": "^8.0.1",
                "nprogress": "^0.2.0",
                "pinia": "^2.0.11",
                "urijs": "^1.19.7",
                "vue": "^3.0.0",
                "vue-class-component": "^8.0.0-0",
                "vue-router": "^4.0.0-0"
            },
            "devDependencies": {
                "@babel/plugin-proposal-optional-chaining": "^7.16.7",
                "@types/axios": "^0.14.0",
                "@types/js-cookie": "^3.0.1",
                "@types/nprogress": "^0.2.0",
                "@types/urijs": "^1.19.18",
                "@typescript-eslint/eslint-plugin": "^4.18.0",
                "@typescript-eslint/parser": "^4.18.0",
                "@vue/cli-plugin-babel": "~4.5.0",
                "@vue/cli-plugin-eslint": "~4.5.0",
                "@vue/cli-plugin-router": "~4.5.0",
                "@vue/cli-plugin-typescript": "~4.5.0",
                "@vue/cli-service": "~4.5.0",
                "@vue/compiler-sfc": "^3.0.0",
                "@vue/eslint-config-airbnb": "^5.0.2",
                "@vue/eslint-config-typescript": "^7.0.0",
                "babel-eslint": "^8.2.6",
                "eslint": "^7.1.0",
                "eslint-plugin-import": "^2.20.2",
                "eslint-plugin-vue": "^7.0.0",
                "sass": "^1.26.5",
                "sass-loader": "^8.0.2",
                "typescript": "~4.1.5",
                "unplugin-auto-import": "^0.5.11",
                "unplugin-vue-components": "^0.17.18"
            }
        };

        api.extendPackage(() => pkg);
    }

    if (options.template === 'microapp') {
        api.render('./template/microapp/');
    } else if (options.template === 'mainapp') {
        api.render('./template/mainapp/');
    } else if (options.template === 'microappvue3') {
        api.render('./template/microapp-vue3/')
    }

    api.onCreateComplete(() => {
        console.log('\033[32m' + '\n\n安装完成\n' + '1. cd ' + rootOptions.projectName + '\n' + '2. npm run init\n' +'3. npm run dev\n' +'\n\n提示：\n' +'.env.prod, .env.pre, .env.staging .env.development\n' +'文件内的API需要更换为对应接口\n' +'\033[0m');
    });
}