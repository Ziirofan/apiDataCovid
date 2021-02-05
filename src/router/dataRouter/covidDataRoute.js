const createError = require('http-errors')
const config = JSON.parse(process.env.APP_CONFIG)

module.exports = class CovidDataRoute{
    constructor(covDataController, app){
        this.covDataController = covDataController;
        this.app = app;
    }
    init(){
        this.getAreaData()
        this.getAreaDataToday();
        this.getAreaDataWeekly();
        this.getAreaDataOnDate();
        this.getAreaDataBetweenDate();
        this.getGran();
    }
    runAsyncWrapper (callback) {
        return function (req, res, next) {
          callback(req, res, next)
            .catch(next)
        }
    }

    getGran(){
        this.app.get(config.server.endpoint+"/getGran", this.runAsyncWrapper(async (req, res)=>{
            let resultDB = await this.covDataController.queryGran()
            
            if(resultDB.length === 0)
                throw createError(400, `Region '${req.query.region}' not found`)
            return res.status(200).json(resultDB);
        }))
    }
    getAreaData(){
        this.app.get(config.server.endpoint+"/getAreaData", this.runAsyncWrapper(async (req, res)=>{
            let resultDB = await this.covDataController.queryAreaData(req.query.code)
            
            if(resultDB.length === 0)
                throw createError(400, `Region '${req.query.region}' not found`)
            return res.status(200).json(resultDB);
        }))
    }
    getAreaDataToday(){
        this.app.get(config.server.endpoint+"/getAreaDataToday", this.runAsyncWrapper(async (req, res)=>{
            let resultDB = await this.covDataController.queryAreaDataToday(req.query.code)
            
            if(resultDB.length === 0)
                throw createError(400, `Region '${req.query.region}' not found`)
            return res.status(200).json(resultDB);
        }))
    }
    getAreaDataWeekly(){
        this.app.get(config.server.endpoint+"/getAreaDataWeekly", this.runAsyncWrapper(async (req, res)=>{
            let resultDB = await this.covDataController.queryAreaDataWeekly(req.query.code)
            if(resultDB.length === 0)
                throw createError(400, `Region '${req.query.region}' not found`)
            return res.status(200).json(resultDB);
        }))
    }
    getAreaDataOnDate(){
        this.app.get(config.server.endpoint+"/getAreaDataOnDate", this.runAsyncWrapper(async (req, res)=>{
            let resultDB = await this.covDataController.queryAreaDataOnDate(req.query.code, req.query.date)
            if(resultDB.length === 0)
                throw createError(400, `Region '${req.query.region}' not found`)
            return res.status(200).json(resultDB);
        }))
    }
    getAreaDataBetweenDate(){
        this.app.get(config.server.endpoint+"/getAreaDataBetweenDate", this.runAsyncWrapper(async (req, res)=>{
            let resultDB = await this.covDataController.queryAreaDataBetweenDate(req.query.code, req.query.dateStart, req.query.dateEnd)
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