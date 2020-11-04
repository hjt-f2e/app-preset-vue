const fs = require('fs');
const path = require('path');

const { isBinaryFileSync } = require('isbinaryfile');

async function generate(dir, files, base = '', rootOptions = {}, options = {}) {
    const glob = require('glob');

    glob.sync('**/*', {
        cwd: dir,
        nodir: true
    }).forEach(rawPath => {
        const sourcePath = path.resolve(dir, rawPath);
        const filename = path.join(base, rawPath);

        if (isBinaryFileSync(sourcePath)) {
            files[filename] = fs.readFileSync(sourcePath);
        } else {
            let content = fs.readFileSync(sourcePath, 'utf-8');
            
            const sourceList = ['vue.config.js', 'index.js'];
            if (sourceList.indexOf(path.basename(filename)) !== -1) {
                content = content.replace('{{name}}', rootOptions.projectName || '');
                content = content.replace('{{appName}}', options.appName || '');
            }

            if (filename.charAt(0) === '_' && filename.charAt(1) !== '_') {
                files[`.${filename.slice(1)}`] = content;
            } else if (filename.charAt(0) === '_' && filename.charAt(1) === '_') {
                files[`${filename.slice(1)}`] = content;
            } else {
                files[filename] = content;
            }
        }
    })
}

module.exports = (api, options, rootOptions) => {
    if (options.template === 'microapp') {
        api.extendPackage(pkg => {
            return {
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
                "dependencies": {
                    "@sentry/browser": "^5.27.2",
                    "@sentry/integrations": "^5.27.2",
                    "@sentry/tracing": "^5.27.2",
                    "ant-design-vue": "^1.7.1",
                    "axios": "^0.21.0",
                    "core-js": "^3.6.5",
                    "js-cookie": "^2.2.1",
                    "js-md5": "^0.7.3",
                    "normalize.css": "^8.0.1",
                    "nprogress": "^0.2.0",
                    "qiniu-js": "^3.1.1",
                    "urijs": "^1.19.2",
                    "vue": "^2.6.11",
                    "vue-router": "^3.4.8",
                    "vuex": "^3.5.1",
                    "vuex-persist": "^3.1.3"
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
        });
    } else if (options.template === 'mainapp') {

    }

    api.render(async function(files) {
        Object.keys(files).forEach(name => {
            delete files[name];
        });

        const template = options.template;
        if (template === 'microapp') {
            await generate(path.resolve(__dirname, './template/microapp'), files, '', rootOptions, options);
        } else if (template === 'mainapp') {
            
        }
    });

    api.onCreateComplete(() => {
        console.log('\033[32m' + '\n\n安装完成\n' + '1. cd ' + rootOptions.projectName + '\n' + '2. npm run init\n' +'3. npm run (dev)\n' +'\n\n提示：\n' +'.env.production, .env.staging .env.development\n' +'文件内的API需要更换为对应接口\n' +'\033[0m');
    });
}