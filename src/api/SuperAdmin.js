import axios from 'axios';

const superAdminInstance = axios.create({
  baseURL: import.meta.env.VITE_LM_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

superAdminInstance.interceptors.request.use(
  (config) => {
    const newConfig = { ...config };

    const token = localStorage.getItem('access_token');
    if (token) {
      newConfig.headers = {
        ...newConfig.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return newConfig;
  },
  (error) => Promise.reject(error),
);

const makeRequest = (method, url, data = null) => superAdminInstance[method](url, data)
  .then((response) => response.data)
  .catch((err) => {
    if (err.response && err.response.status === 401) {
      window.location.href = '/login';
    }
    console.error(err);
    return false;
  });

export const login = (data) => makeRequest('post', '/auth/admin/signin', data);

export const findProfessionals = () => makeRequest('get', '/superadmin/professionals');

export const findProfessionalById = (id) => makeRequest('get', `/superadmin/professionals/${id}`);

export const findUserById = (id) => makeRequest('get', `/superadmin/users/${id}`);

export const getTokenProfessional = (id) => makeRequest('get', `/superadmin/users/redirect/${id}`).then((data) => data.user);

export const findAdmins = () => makeRequest('get', '/admin');

export const findAdminById = (id) => makeRequest('get', `/admin/${id}`);

export const updateAdmin = (id, data) => makeRequest('put', `/admin/${id}`, data);

export const createAdmin = (data) => makeRequest('post', '/admin', data);

export const deleteAdmin = (id) => makeRequest('delete', `/admin/${id}`);
