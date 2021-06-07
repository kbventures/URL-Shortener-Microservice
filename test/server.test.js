const server = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = require('chai');


chai.use(chaiHttp);


describe('POST NEW url', () => {
    it('POST NEW response shoud be an object with original_url and short_url properties', (done) => {
        console.log('testing');

        const newPost = {
            url: 'https://boilerplate-project-urlshortener.twotani.repl.co/?v=1621725328406'
        }

        chai.request(server)
            .post('/api/shorturl')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send(newPost)
            .end((err,res) => {
                expect(res).to.have.status(200);
                expect(res).to.be.an('object');
                expect(res.body).that.includes.keys('original_url', 'short_url');
                expect(res.body.original_url).to.equals(newPost.url);
                done();
            })
    })
})

