const test = `constexpress=require('express')constrouter=express.Router()router.get('/route1',(req,res,next)=>{const{route1Id}=req.queryres.resRawData=route1Idnext()})router.post('/route2',(req,res,next)=>{const{id,name,sex}=req.bodyres.resRawData={id,name,sex}next()})module.exports=router`


const str = test.replace(/\s*/mg,"")
const startIndex = str.match(/router\.[get|post].*\/route1['|"],(.*\{.*)\}\)router.*/i)
console.log(startIndex[1])
// const a = 
// str.substr().replace(/.*\.[get|post].*\/route1.*\{\((.*)\)\}.*/gi,'$1')
// console.log(a)