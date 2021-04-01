const axios = require('axios');
const usersData = require('../database/usersData');

const request = (url, method, data) => {
    return axios({url,method, data, validateStatus: false})
};

test('Should get users', async () => {
    await request('http://localhost:3000/users', 'post', {name: "teste1", email: "teste1@gmail.com"});
    await request('http://localhost:3000/users', 'post', {name: "teste2", email: "teste2@gmail.com"});
    await request('http://localhost:3000/users', 'post', {name: "teste3", email: "teste3@gmail.com"});
    
    
    const response = await request('http://localhost:3000/users', 'get');

    expect(response.status).toBe(200);
    const users = response.data;
    expect(users).toHaveLength(3);

    const getUser1 = await usersData.getUserByEmail("teste1@gmail.com");
    const getUser2 = await usersData.getUserByEmail("teste2@gmail.com");
    const getUser3 = await usersData.getUserByEmail("teste3@gmail.com");

    await usersData.deleteUser(getUser1.rows[0].id);
    await usersData.deleteUser(getUser2.rows[0].id);
    await usersData.deleteUser(getUser3.rows[0].id);

});

test('Should create a user', async () => {
    const data = {
        name: 'teste1',
        email: 'teste1@gmail.com'
    };

    const response = await request('http://localhost:3000/users', 'post', data);

    expect(response.status).toBe(201);
    const user = response.data;
    expect(user[0].name).toBe(data.name);
    expect(user[0].email).toBe(data.email);

    await usersData.deleteUser(user[0].id);
});

test('Should not create a user', async () => {
    const data = {
        name: 'teste1',
        email: 'teste1@gmail.com'
    };

    const response1 = await request('http://localhost:3000/users', 'post', data);
    const response2 = await request('http://localhost:3000/users', 'post', data);

    expect(response2.status).toBe(409);
    const user = response1.data;
    await usersData.deleteUser(user[0].id);

});

test('Should update a user', async () => {
    const data = {
        name: 'teste1',
        email: 'teste1@gmail.com'
    };

    const dataUpdate = {
        name: 'teste update',
        email: 'testeupdate@gmail.com'
    }

    const userCreate = await request('http://localhost:3000/users', 'post', data);
    const userCreated = userCreate.data

    const userUpdate = await request(`http://localhost:3000/users/${userCreated[0].id}`, 'put', dataUpdate);

    expect(userUpdate.status).toBe(204);
    const user = await usersData.getUserByEmail('testeupdate@gmail.com');
    expect(user.rows[0].name).toBe(dataUpdate.name);
    expect(user.rows[0].email).toBe(dataUpdate.email);
    await usersData.deleteUser(user.rows[0].id);

});

test('Should not update a user', async () => {

    const response = await request(`http://localhost:3000/users/${"9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d"}`, 'put', {name: 'teste1', email:'teste1@gmail.com'});

    expect(response.status).toBe(404);
});

test('Should delete a user', async () => {
    const data = {
        name: 'teste1',
        email: 'teste1@gmail.com'
    };

    const createUser = await request('http://localhost:3000/users', 'post', data);
    const user = createUser.data;
    const userId = user[0].id; 

    const response = await request(`http://localhost:3000/users/${userId}`, 'delete');
    expect(response.status).toBe(204);
    
   const result = await usersData.getUsers();

   expect(result.rows).toHaveLength(0);

});

test('Should not delete a user', async () => {
    const response = await request(`http://localhost:3000/users/9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d`, 'delete');
    expect(response.status).toBe(404);
});

