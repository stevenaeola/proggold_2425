const request = require('supertest');
const app = require('./app');

describe('Test the coffee service', () => {
    test('GET /coffee/all', () => {
        return request(app)
	    .get('/coffee/all')
	    .expect(200);
    });

    test('GET /coffee/all returns JSON', () => {
        return request(app)
	    .get('/coffee/all')
	    .expect('Content-type', /json/);
    });

    test('GET /index.html returns HTML', () => {
        return request(app)
	    .get('/index.html')
	    .expect('Content-type', /html/);
    });

    test('GET /coffee/all includes americano', () => {
        return request(app)
	    .get('/coffee/all')
	    .expect(/americano/);
    });



    test('POST coffee/add succeeds', () => {
        const params = {"name": "testy_coffee", "taste": "Very testy", "strength": -2};
        return request(app)
        .post('/coffee/add')
        .send(params)
	    .expect(200);
    });

    test('POST coffee/add fails with a space in the name', () => {
        const params = {"name": "bad name", "taste": "horrible", "strength": -2};
        return request(app)
        .post('/coffee/add')
        .send(params)
	    .expect(400);
    });

    test("POST user/is_admin identifies admin", () => {
        const params = {"username": "abcdf12!"}
        return request(app)
        .post('/user/is_admin')
        .send(params)
	    .expect(200);
    })

    test("POST user/is_admin identifies non-admin", () => {
        const params = {"username": "abcdf12"}
        return request(app)
        .post('/user/is_admin')
        .send(params)
	    .expect(403);
    })
});