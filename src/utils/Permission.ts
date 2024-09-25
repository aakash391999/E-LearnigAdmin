import {PermissionsAndroid, Platform, Alert} from 'react-native';

export const storagePermission = () => {
  return new Promise(async (resolve, reject) => {
    try {
      if (Platform.OS === 'android') {
        PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        ])
          .then(granted => {
            if (
              (granted['android.permission.WRITE_EXTERNAL_STORAGE'] ==
                'granted' ||
                granted['android.permission.READ_EXTERNAL_STORAGE'] ==
                  'granted') 
            ) {
              return resolve(true);
            }
          return  resolve(true);
          })
          .catch(err => {
            console.log(
              err,
              'errerrerrerrcontactsPermissioncontactsPermission',
            );

            reject(false);
          });
      } else {
        return resolve(true);
      }
    } catch (error) {
      console.log(error, 'errerrerrerrcontactsPermissioncontactsPermission');

      reject(error);
    }
  });
};

export const cameraPermission = () => {
  return new Promise(async (resolve, reject) => {
    try {
      if (Platform.OS === 'android') {
      PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.CAMERA,
      ])
        .then(granted => {
          console.log(granted, 'grantedgrantedCAMERACAMERACAMERACAMERACAMERA');
          if (
            (granted['android.permission.WRITE_EXTERNAL_STORAGE'] ==
              'granted' ||
              granted['android.permission.READ_EXTERNAL_STORAGE'] ==
                'granted') &&
            granted['android.permission.CAMERA'] == 'granted'
          ) {
            ;
            return resolve(true);
          }
         return resolve(false);
        })
        .catch(err => {
          console.log(err, 'errerrerrerrcontactsPermissioncontactsPermission');

          reject(err);
        });
      }
      else{
        return resolve(true);
      }
    } catch (error) {

      reject(error);
    }
  });
};