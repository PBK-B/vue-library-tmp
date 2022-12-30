/*
 * @Author: Bin
 * @Date: 2022-12-29
 * @FilePath: /vue-library-tmp/scripts/build.js
 */
const fs = require("fs");
const crypto = require('crypto');
const { resolve } = require('path');
const shell = require("shelljs");

const libraryDirName = "lib-welcome" // 依赖文件夹名
const productName = "lib-welcome.umd.cjs"; // 构建产物文件名

const rootDir = resolve(__dirname, '../');
const publicDir = resolve(__dirname, '../public');
const libraryDir = resolve(__dirname, `../packages/${libraryDirName}/`);
const libraryFileCjs = resolve(__dirname, `../packages/${libraryDirName}/dist/${productName}`);
const publicCjs = resolve(__dirname, `../public/${productName}`);

function getFileHash256Sync(file) {
    const buffer = fs.readFileSync(file);
    const fsHash = crypto.createHash('sha256');
    fsHash.update(buffer);
    const md5 = fsHash.digest('hex');
    return md5;
}

try {
    fs.accessSync(libraryDir)
    console.log("build library");

    // 构建 lzcAppExt
    shell.cd(libraryDir);
    shell.exec("npm ci && npm run build", { async: true }, async function (code, data, error) {
        if (code !== 0) {
            console.log("library build error 001");
            return;
        }

        let distFileMD5 = "";
        if (fs.existsSync(libraryFileCjs)) {
            distFileMD5 = getFileHash256Sync(libraryFileCjs);
        }

        let oldDistFileMD5 = ""
        if (fs.existsSync(publicCjs)) {
            oldDistFileMD5 = getFileHash256Sync(publicCjs);
        }

        if (distFileMD5 === oldDistFileMD5) {
            // 构建输出没有更新，不需要拷贝
            return;
        }

        shell.cp(libraryFileCjs, publicDir);
    });
} catch (error) {
    console.log("依赖包不存在跳过构建");
}


// 构建项目
shell.cd(rootDir);
shell.exec("npx vue-cli-service build", { async: true });
