const createError = require('http-errors')

module.exports = class CovidDataRoute{
    constructor(covDataController, app){
        this.covDataController = covDataController;
        this.app = app;
    }
    init(){
        this.getAreaData()
        this.getNatData()
    }
    runAsyncWrapper (callback) {
        return function (req, res, next) {
          callback(req, res, next)
            .catch(next)
        }
    }

    getAreaData(){
        this.app.get("/getAreaData", this.runAsyncWrapper(async (req, res)=>{
            let resultDB;
            if(req.query.hasOwnProperty("region")){
                resultDB = await this.covDataController.queryAreaData(req.query.region)
            }
            else if(req.query.hasOwnProperty("departement")){
                resultDB = await this.covDataController.queryAreaData(req.query.departement)
            }
            else{
                throw createError(400, `area '${req.query.region}' not found`)
            }
            
            if(resultDB.length === 0)
                throw createError(400, `Region '${req.query.region}' not found`)
            return res.status(200).json(resultDB);
        }))
    }
    getNatData(){
        this.app.get("/getNatData", this.runAsyncWrapper(async (req, res)=>{
            let resultDB = await this.covDataController.queryAreaData("FRA")
            if(resultDB.length === 0)
                throw createError(400, `Region '${req.query.region}' not found`)
            return res.status(200).json(resultDB);
        }))
    }
    /*getRegionData(){
        this.app.get("/getRegionData", (req, res)=>{
            this.covDataController.queryRegionData(req.query.region)
            .then(result=>{
                console.log(result);
                return res.status(200).send(result)
            })
            .catch(e=>{
                console.error(e)
                return res.status(500).send(e)
            })
        })
    }*/
}