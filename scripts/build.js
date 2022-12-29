/*
 * @Author: Bin
 * @Date: 2022-12-29
 * @FilePath: /vue-library-tmp/scripts/build.js
 */
const fs = require("fs");
const crypto = require('crypto');
const { resolve } = require('path');
const shell = require("shelljs");

const rootDir = resolve(__dirname, '../');
const publicDir = resolve(__dirname, '../public');
const lzcAppExtDir = resolve(__dirname, '../packages/lib-welcome/');
const lzcAppExtCjs = resolve(__dirname, '../packages/lib-welcome/dist/lib-welcome.umd.cjs');


function getFileHash256Sync(file) {
    const buffer = fs.readFileSync(file);
    const fsHash = crypto.createHash('sha256');
    fsHash.update(buffer);
    const md5 = fsHash.digest('hex');
    return md5;
}

try {
    fs.accessSync(lzcAppExtDir)
    console.log("build lib-welcome");

    // 构建 lzcAppExt
    shell.cd(lzcAppExtDir);
    shell.exec("npm install && npm run build", { async: true }, async function (code, data, error) {
        if (code !== 0) {
            console.log("lib-welcome build error 001");
            return;
        }

        const publicCjs = resolve(__dirname, '../public/lib-welcome.umd.cjs');
        const distFileMD5 = getFileHash256Sync(lzcAppExtCjs)
        const oldDistFileMD5 = getFileHash256Sync(publicCjs)
        if (distFileMD5 === oldDistFileMD5) {
            // 构建输出没有更新，不需要拷贝
            return;
        }

        shell.cp(lzcAppExtCjs, publicDir);
    });
} catch (error) {
    console.log("lib-welcome 依赖包不存在跳过构建");
}


// 构建项目
shell.cd(rootDir);
shell.exec("npx vue-cli-service build", { async: true });

