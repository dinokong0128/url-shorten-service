/* eslint-disable arrow-body-style */
import request from 'supertest';
import httpStatus from 'http-status';
import { expect } from 'chai';
import Chance from 'chance';
import shortid from 'shortid';

import server from '../server';
import connectMongoDB from '../mongodb';
import Url from '../models/url-model';
import { port } from '../../config';

const chance = Chance();

describe('Url Shortening', async () => {
  let connection;

  before(() => {
    connection = connectMongoDB();
    server.listen(port);
  });

  after(() => {
    connection.close();
    server.close();
  });

  describe('GET /:code', () => {
    let urlList;

    beforeEach(async () => {
      urlList = new Array(chance.integer({ min: 20, max: 100 }))
        .fill(null).map(() => ({
          url: chance.url(),
          code: shortid.generate(),
        }));
      await Url.deleteMany({});
      await Url.insertMany(urlList);
    });

    it('should get url redirection correctly', async () => {
      const target = await Url.findOne({});
      return request(server)
        .get(`/${target.code}`)
        .expect(httpStatus.FOUND)
        .then((res) => {
          expect(res.headers.location).to.be.equal(target.url);
        });
    });

    it('should report error when the shortened url does not exist', () => {
      return request(server)
        .get('/youarenotgonnafindme')
        .expect(httpStatus.NOT_FOUND);
    });
  });

  describe('POST /', () => {
    const testUrl = chance.url();
    it('saves an url correctly with a shorten url return', () => {
      return request(server)
        .post('/')
        .send({
          url: testUrl,
        })
        .expect(httpStatus.OK)
        .then((res) => {
          const { url, code } = res.body;
          expect(url).to.be.equal(testUrl);
          expect(code).to.be.a('string');
        });
    });
  });
});
