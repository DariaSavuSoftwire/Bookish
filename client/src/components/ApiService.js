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

export async function loanBook(token, username, ISBN, duration) {
    const response = await axios.post(BASE_URL + '/user/loan', {
            username: username,
            ISBN: ISBN,
            duration: duration
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    if (response.status === 201) {
        return response.data;

    } else {
        throw Error(response.data.message);
    }
}

export async function editBook(token, book_id, title, authors, copies_owned) {
    const response = await axios.put(BASE_URL + '/book/update', {
            authors: authors,
            ISBN: book_id,
            title: title,
            copies_owned: copies_owned
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    if (response.status === 201) {
        return response.data;

    } else {
        throw Error(response.data.message);
    }
}

export async function addBook(token, book_id, title, authors, copies_owned) {
    const response = await axios.post(BASE_URL + '/book/create', {
            authors: authors,
            ISBN: book_id,
            title: title,
            copies_owned: copies_owned
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    if (response.status === 201) {
        return response.data;

    } else {
        throw Error(response.data.message);
    }
}

export async function deleteBook(token, book_id) {
    const params = new URLSearchParams({ISBN: book_id});
    const response = await axios.delete(BASE_URL + `/book/delete?${params.toString()}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    if (response.status === 200) {
        return response.data;

    } else {
        throw Error(response.data.message);
    }
}

export async function addUser(token, name, username, role, password) {
    const response = await axios.post(BASE_URL + '/user/add_user', {
            name: name,
            username: username,
            role: role,
            password: password
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    if (response.status === 201) {
        return response.data;

    } else {
        throw Error(response.data.message);
    }
}