/*
    webp生成
    
    程序依赖谷歌官方webp转换工具cwebp
    mac下安装 brew install webp
    windows下安装

    安装完成后运行cwebp -h 如果显示了使用帮助则表示安装成功
 */

var process = require('child_process');
var fs = require('fs');
var chokidar = require('chokidar');

const log = console.log.bind(console);
const ignoreFiles = /(^\..+)|(.+[\/\\]\..+)|(.+?\.webp$)/; // 忽略文件.开头和.webp结尾的

const quality = 75; // webp图片质量，默认75
const imgDir = 'images'; // 默认图片文件夹

// 得到对应的webp格式的文件名，默认为文件名后加上.webp
function getWebpImgName(path) {
    return path + '.webp';
}

// 得到shell命令
function getShellCmd(path) {
    return 'cwebp -q ' + quality + ' ' + path + ' -o ' + getWebpImgName(path);
}

// 监控文件夹
var watcher = chokidar.watch(imgDir, {
    ignored: path => {
        return ignoreFiles.test(path);
    },
    persistent: true // 保持监听状态
});

// 监听增加，修改，删除文件的事件
watcher.on('all', (event, path) => {
    switch (event) {
        case 'add':
        case 'change':
            generateWebpImg(path, (status) => {
                log('生成图片' + getWebpImgName(path) + status);
            });
            break;
        case 'unlink':
            deleteWebpImg(getWebpImgName(path), (status) => {
                log('删除图片' + getWebpImgName(path) + status);
            });
            break;
        default:
            break;
    }
});

log('biubiubiu~~~ 监控已经启动');

function generateWebpImg(path, cb) {
    process.exec(getShellCmd(path), err => {
        if (err !== null) {
            cb('失败');
            log('请先运行cwebp -h命令检查cwebp是否安装ok。')
            log(err);
        } else {
            cb('成功');
        }
    });
}

function deleteWebpImg(path, cb) {
    fs.unlink(path, (err) => {
        if (err) {
            cb('失败');
            log(err)
        } else {
            cb('成功');
        };
    });
}
