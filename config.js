module.exports = {
    mysql:{
        username:"covid",
        password:"covid",
        host:"localhost",
        port:"3306",
        connectionLimit: 10,
        db:"covid"
    },
    server:{
        port:3000,
        host:"127.0.0.1"
    },
    api:{
        address_json:"https://raw.githubusercontent.com/opencovid19-fr/data/master/dist/chiffres-cles.json",
        address_csv:"https://raw.githubusercontent.com/opencovid19-fr/data/master/dist/chiffres-cles.csv"
    },
    debug:{
        debug: true,
        node_env: "developement"
    }
}