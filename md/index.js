/*
 * @Author: Zhang Min 
 * @Date: 2018-05-02 14:41:25 
 * @Last Modified by: Zhang Min
 * @Last Modified time: 2018-05-02 16:07:04
 */

const fs = require('fs');
const glob = require('glob');
const path = require('path');

const marked = require('marked');

const dir = {
    src: path.join(__dirname, './src/'),
    temp: path.join(__dirname, './template/'),
    dist: path.join(__dirname, './dist/')
}
deleteall(dir.dist);
const mds = glob.sync('**.md', {
    cwd: dir.src
});
console.log(mds);
mds.forEach(md => {
    const title = md.split('.')[0];
    // 读取markdown内容
    const markContent = fs.readFileSync(dir.src + md);
    // 转化为html字符串
    const htmlStr = marked(markContent.toString());
    // 读取模版
    let template = fs.readFileSync(dir.temp + 'index.html').toString();
    // 渲染模版
    template = template.replace('@markdown', htmlStr).replace('@title', title);
    // 输出文件
    fs.writeFile(dir.dist + title + '.html', template, err => {
        if (err) {
            console.log(title + '.html failed');
        } else {
            console.log(title + '.html success');
        }
    })
})

// 删除文件夹下的所有文件
function deleteall(path) {
    var files = [];
    if (fs.existsSync(path)) {
        files = fs.readdirSync(path);
        files.forEach(function (file, index) {
            var curPath = path + "/" + file;
            if (fs.statSync(curPath).isDirectory()) {
                deleteall(curPath); // 删除文件
            } else { 
                fs.unlinkSync(curPath); // 删除文件夹
            }
        });
        //fs.rmdirSync(path);
    }
};  