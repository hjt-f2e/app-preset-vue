module.exports = [
    {
        type: "list",
        name: "template",
        message: "请选择应用模块",
        choices: [
            {
                name: "微前端（子应用）",
                value: "microapp",
            },
            {
                name: "微前端（主应用）",
                value: "mainapp",
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
