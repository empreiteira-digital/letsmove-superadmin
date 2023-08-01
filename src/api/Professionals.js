import axios from 'axios';

const professionalsInstance = axios.create({ baseURL: import.meta.env.VITE_LM_BACKEND_URL });

const getProfessionals = () => professionalsInstance.get(
  '/professionals/superadmin',
).then(
  (response) => response.data,
).catch((err) => console.error(err));

export default getProfessionals;
