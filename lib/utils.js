const path = require("path")
const fs = require('fs')
const VError = require('VError')

function traversal(dir) {
    let res = []
    for (let item of fs.readdirSync(dir)) {
        let filepath = path.join(dir, item);
        try {
            let fd = fs.openSync(filepath, 'r');
            let flag = fs.fstatSync(fd).isDirectory();
            fs.close(fd); // TODO
            if (flag) {
                res.push(...traversal(filepath));
            } else {
                res.push(filepath);
            }
        } catch (err) {
            if (err.code === 'ENOENT' && // link 文件打不开
                !!fs.readlinkSync(filepath)) { // 判断是否 link 文件
                res.push(filepath);
            } else {
                console.error('err', err);
                throw new VError(err)
            }
        }
    }
    return res
    // return res.map((file) => path.basename(file))
}


module.exports = {
    traversal
}