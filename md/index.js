/*
 * @Author: Zhang Min 
 * @Date: 2018-05-02 14:41:25 
 * @Last Modified by: Zhang Min
 * @Last Modified time: 2018-05-02 15:05:30
 */

const fs = require('fs');
const path = require('path');

const marked = require('marked');

const dir = {
    src: path.join(__dirname, './src'),
    temp: path.join(__dirname, './template'),
    dist: path.join(__dirname, './dist')
}

fs.readFile(path.join(__dirname, './template/index.html'), 'utf8', (err, template) => {
    if (err) {
        throw err
    } else {
        fs.readFile(path.join(__dirname, './src/1.md'), 'utf8', (err, markContent) => {
            if (err) {
                throw err
            } else {
                // 转化好的html字符串
                let htmlStr = marked(markContent.toString());
                // 将html模板文件中的'@markdown' 替换为 html字符串
                template = template.replace('@markdown', htmlStr);
                // 将新生成的字符串template重新写入到文件中
                fs.writeFile(path.join(__dirname, './dist/1.html'), template, err => {
                    if (err) {
                        throw err
                    } else {
                        console.log("success");
                    }
                })
            }
        })
    }
})