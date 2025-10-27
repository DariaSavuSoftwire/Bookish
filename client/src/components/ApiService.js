import axios from 'axios'

const BASE_URL = 'http://localhost:5000'

export async function userLogin(username, password) {
    const response = await axios.post(BASE_URL + '/user/login', {username: username, password: password});
    if (response.status === 201) {
        return response.data;

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
        return response.data;

    } else {
        console.log(response);
        throw Error(response.data.message);
    }
}

export async function getAllBooks(token, elementsPerPage, currentPage, title, author) {
    const response = await axios.get(BASE_URL + '/book/get_available_books', {
        data: {
            elements_per_page: elementsPerPage,
            page: currentPage,
            title: title ?? null,
            author: author ?? null,
        },
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    if (response.status === 200) {
        return response.data;
    } else {
        console.log(response);
        throw Error(response.data.message);
    }
}