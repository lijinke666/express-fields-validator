module.exports = function(req,res,next){
    const resultData = {
        api:req.originalUrl,
        method:req.method,
        result:{
            code:200,
            data:res.resRawData || {},
            message:"SUCCESS"
        }
    }
    console.log(resultData);
    res.status(res.status || 200).send(resultData)
}