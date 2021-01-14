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
            //console.log(resultDb)
            return resultDb;
        }
        catch(e){
            if(process.env.DEBUG){
                console.error(e)
            }
            throw e;
        }
        
    }
    async getDataByMailleCodeToday(MailleCode){
        try{
            let resultDb
            let d = new Date();
            if(d.getHours()<20)
                resultDb = await this.execQuery("SELECT * FROM cov19_donnees WHERE `maille_code`= ? and date = CURDATE()-1 ORDER BY date DESC", MailleCode);
            else
                resultDb = await this.execQuery("SELECT * FROM cov19_donnees WHERE `maille_code`= ? and date = CURDATE()-1 ORDER BY date DESC", MailleCode);
            return resultDb;
        }
        catch(e){
            if(process.env.DEBUG){
                console.error(e)
            }
            throw e;
        }
    }
    //SELECT * FROM cov19_donnees WHERE `maille_code`= "REG-11" and date > CURDATE()-8 and date < CURDATE()-1
    async getDataByMailleCodeWeekly(MailleCode){
        try{
            let resultDb
            let d = new Date();
            if(d.getHours()<20)
                resultDb = await this.execQuery("SELECT * FROM cov19_donnees WHERE `maille_code`= ? and date > CURDATE()-8 and date < CURDATE() ORDER BY date DESC", MailleCode);
            else
                resultDb = await this.execQuery("SELECT * FROM cov19_donnees WHERE `maille_code`= ? and date > CURDATE()-8 and date < CURDATE()-1 ORDER BY date DESC", MailleCode);
            return resultDb;
        }
        catch(e){
            if(process.env.DEBUG){
                console.error(e)
            }
            throw e;
        }
    }
    async getDataByMailleCodeOnDate(MailleCode, date){
        try{
            let resultDb = await this.execQuery("SELECT * FROM cov19_donnees WHERE `maille_code`= ? and date = ? ORDER BY date DESC", [MailleCode, date])
            //console.log(resultDb)
            return resultDb;
        }
        catch(e){
            if(process.env.DEBUG){
                console.error(e)
            }
            throw e;
        }
        
    }
    async getDataByMailleCodeBetweenDate(MailleCode, dateS, dateE){
        try{
            let resultDb = await this.execQuery("SELECT * FROM cov19_donnees WHERE `maille_code`= ? and date > ? and date < ? ORDER BY date DESC", [MailleCode, dateS, dateE])
            //console.log(resultDb)
            return resultDb;
        }
        catch(e){
            if(process.env.DEBUG){
                console.error(e)
            }
            throw e;
        }
        
    }
    async getGran(){
        try{
            let resultDb = await this.execQuery("SELECT granularite, code FROM granularite")
            //console.log(resultDb)
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