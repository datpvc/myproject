const USER_INFO = 'USER_INFO';

export const userInfoLocal = {
  set: (userData) => {
    let json = JSON.stringify(userData);
    localStorage.setItem(USER_INFO, json);
  },
  get: () => {
    let json = localStorage.getItem(USER_INFO);
    if (json) {
      return JSON.parse(json);
    } else {
      return {};
    }
  },
  remove: () => {
    localStorage.removeItem(USER_INFO);
  },
};
