const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const baseUrl = "http://127.0.0.1:3000"
chai.use(chaiHttp);

describe("région today user", ()=>{
    it('get Data From Area (idf) today', (done)=>{
        chai.request(baseUrl)
        .get('/getAreaDataToday')
        .query({code: "REG-11"})
        .end((err, res)=>{
            //console.log(res)
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            done()
        })
    })
})

describe("région weekly user", ()=>{
    it('get Data From Area (idf) weekly', (done)=>{
        chai.request(baseUrl)
        .get('/getAreaDataWeekly')
        .query({code: "REG-11"})
        .end((err, res)=>{
            //console.log(res)
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            done()
        })
    })
})

describe("région data at specific date", ()=>{
    it('get data from région(idf) at spécific date', (done)=>{
        chai.request(baseUrl)
        .get('/getAreaDataOnDate')
        .query({code: "REG-11", date:"2021-01-01"})
        .end((err, res)=>{
            //console.log(res)
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            done()
        })
    })
})

describe("région data between two date", ()=>{
    it('get data from région(idf) beetwen two date', (done)=>{
        chai.request(baseUrl)
        .get('/getAreaDataBetweenDate')
        .query({code: "REG-11", dateStart:"2020-12-01", dateEnd:"2021-01-01"})
        .end((err, res)=>{
            //console.log(res)
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            done()
        })
    })
})
