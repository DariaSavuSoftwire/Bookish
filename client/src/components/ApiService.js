import axios from 'axios'

const BASE_URL = 'http://localhost:5000'

export async function userLogin(username, password) {
    const response = await axios.post(BASE_URL + '/user/login', {username: username, password: password});
    if (response.status === 201) {
        return response.data.token;

    } else {
        console.log(response);
        throw Error(response.data.message);
    }
}

export async function userRegister(username, name, password) {
    const response = await axios.post(BASE_URL + '/user/register', {
        username: username,
        name: name,
        password: password
    });
    if (response.status === 201) {
        return response.data.token;

    } else {
        console.log(response);
        throw Error(response.data.message);
    }
}