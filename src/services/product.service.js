import { https } from './axios.service';

export const productServices = {
  getAll: () => {
    return https.get('products');
  },
  update: (params) => {
    return https.put(`products/${params.id}`, params);
  },
};
