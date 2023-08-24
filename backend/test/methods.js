const assert = require('assert')
const {expect} = require('chai')
let chai = require('chai');
const {simFunction} = require('../controllers/methods')
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp)

describe('Simulation function', function(){
    
        it('Simulate', async function(done){
            chai.request('http://localhost:5000/API/iotsim')
            .get('/simulate')
            .query({jobId: '64d2435e210dc2b36f223e3c'})
            .then(function (res) {
                expect(res).to.have.status(200);
                done()
             })
             .catch(function (err) {
                throw err;
             });

            //expect(res.body).to.have.status(200)
        })
       
    })
