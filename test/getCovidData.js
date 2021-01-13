const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const baseUrl = "http://127.0.0.1:3000"
chai.use(chaiHttp);

describe("région user", ()=>{
    it('get Data From Area (idf)', (done)=>{
        chai.request(baseUrl)
        .get('/getAreaData')
        .query({region: "REG-11"})
        .end((err, res)=>{
            //console.log(res)
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            done()
        })
    })
})

describe("département user", ()=>{
    it('get Data From Area (idf)', (done)=>{
        chai.request(baseUrl)
        .get('/getAreaData')
        .query({departement: "DEP-11"})
        .end((err, res)=>{
            //console.log(res)
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            done()
        })
    })
})

describe("national user", ()=>{
    it('get Data From NAT (idf)', (done)=>{
        chai.request(baseUrl)
        .get('/getNatData')
        .query()
        .end((err, res)=>{
            //console.log(res)
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            done()
        })
    })
})



