/**
 * @module index
 * @desc main module
 * @author Matthieu Viera Santa Cruz (Ziirofan)
 */

const config = require("./config");
process.env.APP_CONFIG = JSON.stringify(config);

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const Router = require('./src/router/MainRouter')
const createError = require('http-errors')

process.env.DEBUG = config.debug.debug;
process.env.NODE_ENV = config.debug.node_env;



function main(){

    let mainRouter = new Router(app)
    mainRouter.init();

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(cors());
    app.use(cookieParser());
    app.use(express.json());
    
    app.use((req, res, next) => {
        next(createError(404))
      })
    app.use((error, req, res, next) => {
        console.error('Error status: ', error.status)
        console.error('Message: ', error.message)
        return res.status(error.status).json({
            status: error.status,
            message: error.message,
            stack: error.stack
          })
      })
    app.listen(config.server.port, config.server.host, ()=>{
        if(process.env.DEBUG)
            console.log("Server running, listen on port "+config.server.port)
    })
}

main();
