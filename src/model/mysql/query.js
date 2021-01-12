const Connect = require('./connector');

module.exports = class Query{
    constructor(){
        this.connector = new Connect();
        this.init();
    }
    async init(){
        try{
            this.pool = await this.connector.createPool()
        }
        catch(e){
            if(process.env.DEBUG){
                console.error(e)
            }
            throw e;
        }
    }
}