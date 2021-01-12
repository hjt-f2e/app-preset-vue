const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');

const gitcommitTemplate = path.resolve(__dirname, '../.git/gitcommit_template');

fs.copyFileSync(path.resolve(__dirname, 'gitcommit_template'), gitcommitTemplate);

const hookInstall = childProcess.spawn('git', ['config', 'commit.template', gitcommitTemplate], {
    cwd: path.resolve(__dirname, '../'),
    encoding: 'utf-8'
});

hookInstall.stdout.on('data', data => {
    process.stdout.write(data.toString());
});

hookInstall.stderr.on('data', data => {
    process.stderr.write(data.toString());
});
