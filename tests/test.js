const assert = require('assert')        //power-assert

describe('express-fields-validator',()=>{
    let testStr
    const reg = /cosnt\s*{(.*)}\s*=\s*req\.(body|query)$/igm
    beforeEach(()=>{
        testStr = "cosnt {id,name} = req.body"
        result = ['id','name']
    })
    describe(`${reg}`,()=>{
        it('capture ["id","name"]',()=>{
            const data = testStr.replace(reg,'$1').split(',')
            assert.deepStrictEqual(data,result)
        })
    })
    describe('regex length',()=>{
        it('capture ["id","name"], && length =2 ',()=>{
            const data = testStr.replace(reg,'$1').split(',')
            assert(data.length === result.length)
        })
    })
})