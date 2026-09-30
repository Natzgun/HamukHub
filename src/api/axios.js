import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env?.VITE_API_URL || 'http://localhost:8086/api',
  withCredentials: true,
});

let csrfRequest;
instance.interceptors.request.use(async (config) => {
  if (['post', 'put', 'patch', 'delete'].includes(config.method?.toLowerCase())) {
    if (!csrfRequest) {
      csrfRequest = instance.get('/users/csrf').then(({ data }) => data.token)
        .finally(() => { csrfRequest = undefined; });
    }
    config.headers['X-XSRF-TOKEN'] = await csrfRequest;
  }
  return config;
});

export default instance;
