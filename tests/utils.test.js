const assert = require('assert')        //power-assert
const { traversal } = require('../lib/utils')
const path = require('path')

describe('utils',()=>{
    let result = []
    beforeEach(()=>{
        result = [
            'index.js',
            'apiHandler.js',
            'errorHandler.js',
            'route1.js',
            "route2.js"
        ]
    })
    describe('traversal',()=>{
        it('should gets the filename of the folder ',()=>{
            const testPath = path.resolve(__dirname,'../example')
            assert.deepStrictEqual(
                traversal(testPath).map((file)=> path.basename(file)),
                result
            )
        })
    })
})