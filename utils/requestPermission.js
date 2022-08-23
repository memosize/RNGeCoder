import {request, PERMISSIONS} from 'react-native-permissions';

export const requestPermission = permission =>
  new Promise((resolve, reject) => {
    request(permission)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
