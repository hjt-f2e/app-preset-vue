module.exports = [
    {
        type: "list",
        name: 'template',
        message: "请选择应用模块",
        choices: [
            {
                name: "子应用 vue2",
                value: "microapp",
            },
            {
                name: "子应用 vue3",
                value: "microappvue3"
            },
            {
                name: "主应用",
                value: "mainapp",
            }
        ]
    },
    {
        type: 'list',
        name: 'uiframework',
        message: '请选择内置UI框架(vue3子应用目前只支持element UI)',
        choices: [
            {
                name: 'Ant Design',
                value: 'antd'
            },
            {
                name: 'element UI',
                value: 'element'
            }
        ]
    },
    {
        type: 'input',
        name: 'appName',
        message: '请输入应用名称（路由前缀）',
        filter(input) {
            return new Promise((resolve, reject) => {
                if (input) {
                    resolve(input);
                } else {
                    reject(new Error('应用名称不能为空'));
                }
            })
        }
    }
];
