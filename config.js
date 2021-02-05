module.exports = {
    mysql:{
        username: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_PASS,
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        connectionLimit: 10,
        db:process.env.MYSQL_DB
    },
    server:{
        port:process.env.SERVER_PORT,
        host:process.env.SERVER_HOST,
        endpoint:process.env.SERVER_ENDPOINT
    },
    api:{
        address_json:"https://raw.githubusercontent.com/opencovid19-fr/data/master/dist/chiffres-cles.json",
        address_csv:"https://raw.githubusercontent.com/opencovid19-fr/data/master/dist/chiffres-cles.csv"
    }
}