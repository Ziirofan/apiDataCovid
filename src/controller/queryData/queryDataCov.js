module.exports = class QueryDataCov {
    constructor(model){
        this.model = model
    }
    async queryAreaData(code){
        try{
            let resultDb = await this.model.getDataByMailleCode(code);
            return resultDb;
        }
        catch(e){
            if(process.env.DEBUG){
                console.error(e)
            }
            throw e;
        }
    }
    async queryAreaDataToday(code){
        try{
            let resultDb = await this.model.getDataByMailleCodeToday(code);
            return resultDb;
        }
        catch(e){
            if(process.env.DEBUG){
                console.error(e)
            }
            throw e;
        }
    }
    async queryAreaDataWeekly(code){
        try{
            let resultDb = await this.model.getDataByMailleCodeWeekly(code);
            return resultDb;
        }
        catch(e){
            if(process.env.DEBUG){
                console.error(e)
            }
            throw e;
        }
    }
    async queryAreaDataOnDate(code, date){
        try{
            let resultDb = await this.model.getDataByMailleCodeOnDate(code, date)
            return resultDb;
        }
        catch(e){
            if(process.env.DEBUG){
                console.error(e)
            }
            throw e;
        }
    }
    async queryAreaDataBetweenDate(code, dateS, dateE){
        try{
            let resultDb = await this.model.getDataByMailleCodeBetweenDate(code, dateS, dateE)
            return resultDb;
        }
        catch(e){
            if(process.env.DEBUG){
                console.error(e)
            }
            throw e;
        }
    }
    async queryGran(){
        try{
            let resultDb = await this.model.getGran()
            return resultDb;
        }
        catch(e){
            if(process.env.DEBUG){
                console.error(e)
            }
            throw e;
        }
    }
}