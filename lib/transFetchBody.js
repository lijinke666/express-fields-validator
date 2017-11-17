const { StringDecoder } = require('string_decoder')
const decoder = new StringDecoder('utf8')
const VError = require('verror')

module.exports = ()=> (req,res,next) => {
    const chunks = []
    let chunkSize = 0
    req.on('data', (chunk) => {
        chunks.push(chunk)
        chunkSize += chunk.length
    })
    req.on('end', () => {
        const result = decoder.write(Buffer.concat(chunks, chunkSize))
        req.body = Object.assign(req.body, result && JSON.parse(result) || {})
        next()
    })
    req.on('error', (error) =>{ throw new VError(`trans fetch body data faild : ${error}`)} )
}
