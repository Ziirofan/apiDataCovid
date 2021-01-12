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

process.env.DEBUG = config.debug.debug;
process.env.NODE_ENV = config.debug.node_env;

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());
app.use(cookieParser());
app.use(express.json());

function main(){
    app.listen(config.server.port, config.server.host, ()=>{
        if(process.env.DEBUG)
            console.log("Server running, listen on port "+config.server.port)
    })
}

main();
