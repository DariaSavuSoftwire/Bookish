import axios from 'axios'

const BASE_URL = 'http://localhost:5000'

export async function userLogin(username, password) {
    const response = await axios.post(BASE_URL + '/user/login', {username: username, password: password});
    if (response.status === 201) {
        return response.data;

    } else {
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
        throw Error(response.data.message);
    }
}

export async function getAllBooks(token, elementsPerPage, currentPage, title, author) {
    const params = new URLSearchParams({
        elements_per_page: elementsPerPage,
        page: currentPage,
        title: title || "",
        author: author || "",
    });
    const response = await axios.get(BASE_URL + `/book/get_available_books?${params.toString()}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    if (response.status === 200) {
        return response.data;
    } else {
        throw Error(response.data.message);
    }
}