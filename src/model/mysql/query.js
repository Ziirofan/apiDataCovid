const Connect = require('./connector');

module.exports = class Query{
    constructor(){
        this.connector = new Connect();
        this.init();
    }
    init(){
        this.connector.createPool()
        .then(_=>{
            this.pool = this.connector.pool;
        })
        .catch(e =>{
            return e;
        })     
    }
    async execQuery(query, param){
        try{
            let resultDb = await this.connector.query(query, param)
            return resultDb
        }
        catch(e){
            if(process.env.DEBUG){
                console.error(e)
            }
            throw e;
        }
    }
    async getDataByMailleCode(MailleCode){
        try{
            let resultDb = await this.execQuery("SELECT * FROM cov19_donnees WHERE `maille_code`= ? ORDER BY date DESC", MailleCode)
            console.log(resultDb)
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