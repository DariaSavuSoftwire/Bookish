import {object, string} from 'yup';

export const loginSchema = object({
    username: string().required("Username is required"),
    password: string().required("Password is required"),
});

export const registerSchema = object({
    username: string().required("Username is required"),
    name: string().required("Name is required"),
    password: string().required("Password is required"),
});

