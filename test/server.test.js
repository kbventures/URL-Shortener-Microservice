//DURING THE TEST THE ENV VARIABLE IS SET TO 'test'
process.env.NODE_ENV = 'test';

// REQUIRE THE DEV-DEPENDENCIES
const server = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const { expect } = require('chai');

chai.use(chaiHttp);

describe('POST NEW url', () => {
  it('POST NEW response shoud be an object with key original_url and short_url for properties and the url received and a number representing it in them mongodb as keys respectively ', (done) => {
    console.log('testing');

    const newPost = {
      url: 'https://boilerplate-project-urlshortener.twotani.repl.co/?v=1621725328406',
    };

    chai
      .request(server)
      .post('/api/shorturl')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send(newPost)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.an('object');
        expect(res.body).that.includes.keys('original_url', 'short_url');
        expect(res.body.original_url).to.equals(newPost.url);
        expect(res.body.short_url).to.be.an('number');
        done();
      });
  });
});
