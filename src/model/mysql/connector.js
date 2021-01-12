const mysql = require('mysql');

module.exports = class dbConnect{
    constructor(){
        this.config = JSON.parse(process.env.APP_CONFIG);

    }
    async createPool(){
        try{
            this.pool = mysql.createPool({
                connectionLimit: this.config.mysql.connectionLimit,
                host: this.config.mysql.host,
                user: this.config.mysql.username,
                password: this.config.mysql.password,
                database: this.config.mysql.db
            })
            this.pool.getConnection((e, co)=>{
                if(err) throw err;
                co.release();
            })
            return this.pool;

        }
        catch(e){
            if(process.env.DEBUG){
                console.error(e)
            }
            throw e;
        }  
    }
}