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
}