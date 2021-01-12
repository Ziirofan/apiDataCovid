const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const baseUrl = "http://127.0.0.1:3000"
chai.use(chaiHttp);

describe("authentication user", ()=>{
    it('get Data From Area (idf)', (done)=>{
        chai.request(baseUrl)
        .get('/getDataRegion')
        .query({region: "REG-11"})
        .end((err, res)=>{
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            done()
        })
    })
})