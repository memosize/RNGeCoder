import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';

export const checkPermission = permission =>
  new Promise((resolve, reject) => {
    check(permission)
      .then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            reject('unavailable');
            break;
          case RESULTS.DENIED:
            reject('denied');
            break;
          case RESULTS.LIMITED:
            reject('limited');
            break;
          case RESULTS.GRANTED:
            resolve('granted');
            break;
          case RESULTS.BLOCKED:
            break;
        }
      })
      .catch(error => {
        // …
        reject('catch error');
      });
  });
