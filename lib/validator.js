
const VError = require('verror')
const fs = require('fs')
const path = require('path')
const utils = require('./utils')

const defaultOptions = {
    entry: "/",
    prefix: "/api"
}

module.exports = (_options) => (req, res, next) => {
    const options = Object.assign({}, defaultOptions, _options)
    const { entry,prefix } = options
    const routeName = req.originalUrl.replace(options.prefix+"/","")

    const params = validator.getOriginalUrlRequestParams(
        entry,
        routeName
    )
    console.log(params);
    next()
}

const validator = {
    /**
     * 解析当前请求路由 所写的字段
     * @param {String} entry 文件入口 
     * @param {any} routeName  路由名称
     * @returns fileds
     */
    getOriginalUrlRequestParams(entry,routeName) {
        if(!entry) throw new VError('[getOriginalUrlRequestParams-error]: entry can not be empty!')
        const fileLists = utils.traversal(entry)
        let fileds = ""
        for(let file of fileLists){
            const fileContent =  this.getFileContent(file)
            const currentFileds = this.matchRoute(fileContent,routeName)
            if(currentFileds){
                fileds = this.parseField(currentFileds)
                break
            }
        }
        return fileds
    },

    /**
     * 获取文件内容
     * @param {String} path 
     * @return fileContent
     */
    getFileContent(path) {
        const content = fs.readFileSync(path)
        return content.toString()
    },

    /**
     * 匹配代码中的 字段
     * @param {String} content 代码文本
     * @return [field1,field2,...field]
     */
    parseField(content = "") {
        if (!content) throw new VError('[parseField faild] : routeName can not be empty !')
        const exec = content.replace(/\s*/gm, "").split(/.*(const|var|let){(.*)}=\w*\.(body|query).*/ig)
        return ([...new Set(exec)][2] || []).split(',')
    },

    /**
     * 匹配当前请求路由 中的内容
     * @param {String} routeName
     * @return routeContent 
     */
    matchRoute(content, routeName) {
        if (!routeName) throw new VError('[matchRoute faild] : routeName can not be empty !')
        const targetContent = content
            .replace(/\s*/gm, "")
            .match(/router\.[get|post].*\/route1['|"],(.*\{.*)\}\)router.*/i) || []
        return targetContent[1] || ""
    }
}
