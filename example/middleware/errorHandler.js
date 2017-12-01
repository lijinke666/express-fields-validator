module.exports = function(err,req,res,next){
    const resultData = {
        api:req.originalUrl,
        method:req.method,
        result:{
            code:500,
            message:err && err.message || ""
        }
    }
    res.status(err && err.status || 500).send(resultData)
}