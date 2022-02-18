import axios from 'axios';
import config from "../config";

// const https = require('https');
//
// const agent = new https.Agent({
//     rejectUnauthorized: false,
// });

const instance = axios.create({
    baseURL: config.WS_BASE_URL,
});

instance.interceptors.request.use(async (config) => {
    const token = localStorage.getItem('token');
    config.headers.Authorization = (token ? token : '');
    config.headers.ContentType = 'application/json';
    return config;
});

export const getAll = async () => (
    await instance.post('users/all')
);

export const register = async (name, email, password, phone, agency, role) => (
    await instance.post('users/register', {name, email, password, phone, agency, role})
);

export const confirmRegister = async id => (
    await instance.post(`users/confirm/${id}`)
);

export const forgotPassword = async email => (
    await instance.post('users/forgotpassword', {email})
);

export const confirmReset = async (id, password) => (
    await instance.post(`users/resetpass/${id}`, {password})
);

export const login = async (email, password) => (
    await instance.post('users/login', {email, password})
);

export const logout = async token => (
    await instance.post('users/logout', {token})
);

export const edit = async (userID, name, email) => (
    await instance.post('/users/edit', {userID, name, email})
);

export const robotdata = async (id , name, x, y, z, date) => (
    await instance.get('users/robots/find', {id , name, x, y, z, date})
);

export const robotstatedata = async (id, name, battery, power, date) => (
    await instance.get('users/robotsstate/find', {id, name, battery, power, date})
);

export const robotcommand = async (l_hip, l_knee, r_hip, r_knee) => (
    await instance.post('users/ros/nodejs', {l_hip, l_knee, r_hip, r_knee})
);
export const robotpower = async (id, percentage, current, voltage) => (
    await instance.post('users/robotsbattery/find', {id, percentage, current, voltage})
);