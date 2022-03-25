const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Rat = require('../lib/models/Rat');

describe('Ratalog routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should create a new rat with a name, sex, and color', async () => {
    const res = await request(app)
      .post('/api/v1/rats')
      .send({ 
        name: 'lab rat',
        sex: 'male',
        color: 'white'
      });

    expect(res.body).toEqual({
      id: expect.any(String),
      name: 'lab rat',
      sex: 'male',
      color: 'white',
    });
  });

  it('gets a list of rats', async () => {
    await Rat.create({ name: 'lab rat', sex: 'male', color: 'white' });
    const res = await request(app)
      .get('/api/v1/rats');

    expect(res.body).toEqual(
      await Rat.getAll()
    );
  });
  
  it('gets a rat by id', async () => {
    const rat = await Rat.create({ name: 'lab rat', sex: 'male', color: 'white' });
    // const expected = await Rat.getById(1);
    const res = await request(app)
      .get(`/api/v1/rats/${rat.id}`);

    expect(res.body).toEqual(rat);
  });

  it('updates a rat by id', async () => {
    const expected = await Rat.create({
      name: 'Morty',
      sex: 'female',
      color: 'white',
    });
    const res = await request(app)
      .patch(`/api/v1/rats/${expected.id}`)
      .send({ name: 'Morty' });

    expect(res.body).toEqual(expected);
  });

  it('deletes a rat by id', async () => {
    const expected = await Rat.create({
      name: 'Splinter',
      sex: 'male',
      color: 'agouti',
    });
    const res = await request(app)
      .delete(`/api/v1/rats/${expected.id}`);

    expect(res.body).toEqual(expected);
  });


});
