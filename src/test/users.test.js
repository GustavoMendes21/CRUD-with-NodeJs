const { expect } = require('@jest/globals');
const axios = require('axios');
const usersData = require('../database/usersData');

const request = (url, method, data) => {
    return axios({url,method, data, validateStatus: false})
};

test('Should get users', async () => {
    const response = await request('http://localhost:3000/users', 'get');

    expect(response.status).toBe(200);
    const users = response.data;
    expect(users).toHaveLength(2);
});