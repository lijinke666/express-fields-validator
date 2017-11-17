
const VError = require('verror')
const fs = require('fs')
const path = require('path')

const defaultOptions = {
    rootDir:"/",
    prefix:"/api"
}
module.exports = (_options) => (req, res, next) => {
    const options = Object.assign({},defaultOptions,_options)

    const { originalUrl } = req
    console.log(originalUrl)
    next()
}

function getOriginalUrlRequestParams(){
    const p = path.resolve(__dirname,"../example/route.js")
    fs.access(p,(err)=>{
        if(err) throw new VError(err)
        const isDirectory = fs.lstatSync(p).isDirectory()

        if(isDirectory){

        }else{
            // const content = getFileContent(p)
            const fields = paseField(
                getFileContent(p)
            )
            console.log(fields)
        }
        // const dir = fs.readFileSync(p).toString()
        // console.log(dir);
    })

}

function getFileContent(path){
    const content = fs.readFileSync(path)
    return content.toString()
}

/**
 * 匹配代码中的 字段
 * @param {String} content 代码文本
 * @returns [field1,field2,...field]
 */
function paseField(content = ""){
    const exec = content.replace(/^(const|let|var).*{(.*)}.*(body|query)$/igm,'$1').replace(/\s/igm,"")
    return [...new Set(exec.split(","))]
}

getOriginalUrlRequestParams()