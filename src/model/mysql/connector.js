const mysql = require('mysql');

module.exports = class dbConnect{
    constructor(){
        this.config = JSON.parse(process.env.APP_CONFIG);

    }
    async createPool(){
        try{
            this.pool = await mysql.createPool({
                connectionLimit: this.config.mysql.connectionLimit,
                host: this.config.mysql.host,
                user: this.config.mysql.username,
                password: this.config.mysql.password,
                database: this.config.mysql.db
            })
            this.pool.getConnection((err, co)=>{
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
    /**
     * @todo Rewrite in async/await (solution not found)
     * @param {String} query 
     * @param {String | Array} param 
     */
    query(query, param){
        return new Promise((result, reject)=>{
            let sql = mysql.format(query, param)
            this.pool.query(sql, (error, results, fields)=>{
                if(error) reject(error);
                result(results);
            })
        })
    }
}