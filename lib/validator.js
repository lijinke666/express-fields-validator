
const VError = require('verror')
const fs = require('fs')
const path = require('path')

const defaultOptions = {
    root: "/",
    prefix: "/api"
}
module.exports = (_options) => (req, res, next) => {
    const options = Object.assign({}, defaultOptions, _options)

    const { originalUrl } = req
    console.log(originalUrl)
    next()
}

const validator = {
    getOriginalUrlRequestParams() {
        const p = path.resolve(__dirname, "../example/router")
        fs.access(p, (err) => {
            if (err) throw new VError(err)

            const isDirectory = fs.lstatSync(p).isDirectory()
            if (isDirectory) {
                console.log(1)
            } else {
                // const content = getFileContent(p)
                const fields = parseField(
                    getFileContent(p)
                )
                console.log(fields)
            }
            // const dir = fs.readFileSync(p).toString()
            // console.log(dir);
        })

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
        if (!content) throw new VError('[matchRoute faild] : routeName can not be empty !')
        const exec = content.replace(/\s*/gm, "").split(/.*(const|var|let){(.*)}=\w*\.(body|query).*/ig)
        return [...new Set(exec)][2].split(',')
    },

    /**
     * 匹配当前请求路由 中的内容
     * @param {String} routeName
     * @return routeContent 
     */
    matchRoute(routeName) {
        if (!routeName) throw new VError('[matchRoute faild] : routeName can not be empty !')
        const test = `
        const express = require('express')
        const router = express.Router()
        
        
        router.get('/route1', (req, res, next) => {
            const { route1Id } = req.query
            res.resRawData = route1Id
            next()
        })
        
        router.post('/route2', (req, res, next) => {
            const {
                id,
                name,
                sex
            } = req.body
        
            res.resRawData = { id, name, sex }
            next()
        })
        
        module.exports = router
        `
        const targetContent = `
        router.post('/route2', (req, res, next) => {
            const {
                id,
                name,
                sex
            } = req.body
        
            res.resRawData = { id, name, sex }
            next()
        })
        `
        return targetContent
    }
}

const content = validator.matchRoute('/route1')
const field = validator.parseField(content)
console.log(field);