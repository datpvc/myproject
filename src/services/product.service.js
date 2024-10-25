import { https } from './axios.service';

export const productServices = {
  getAll: () => {
    return https.get('products');
  },
};
