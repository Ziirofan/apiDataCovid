const ModelMysql = require('../model/mysql/query')
const CovDataController = require('../controller/queryData/queryDataCov')
const CovidDataRoute = require('./dataRouter/covidDataRoute')


module.exports = class MainRouter{
    constructor(app){
        this.app = app;
        this.modelMysql = new ModelMysql();
        this.covDataController = new CovDataController(this.modelMysql)
        this.covidDataRoute = new CovidDataRoute(this.covDataController, app)
    }
    init(){
        this.covidDataRoute.init()
    }
}