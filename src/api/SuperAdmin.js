import axios from 'axios';

const superAdminInstance = axios.create({ baseURL: import.meta.env.VITE_LM_BACKEND_URL });

export const findProfessionals = () => superAdminInstance.get(
  '/superadmin/professionals',
).then(
  (response) => response.data,
).catch((err) => console.error(err));

export const findProfessionalById = (id) => superAdminInstance.get(
  `/superadmin/professionals/${id}`,
).then(
  (response) => response.data,
).catch((err) => console.error(err));

export const findUserById = (id) => superAdminInstance.get(
  `/superadmin/users/${id}`,
).then(
  (response) => response.data,
).catch((err) => console.error(err));

export const getTokenProfessional = (id) => superAdminInstance.get(
  `/users/redirect/${id}`,
).then(
  (response) => response.data.user,
).catch((err) => console.error(err));
