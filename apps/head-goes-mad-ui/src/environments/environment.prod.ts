import { IAppConfig } from '@hgm/common';

export const environment: IAppConfig = {
  production: true,
  firebase: {
    apiKey: 'AIzaSyBvTKGJUG9pUlc1W9OHJlywjDO5Guwr6TM',
    authDomain: location.host,
    databaseURL:
      'https://head-goes-mad-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'head-goes-mad',
    storageBucket: 'head-goes-mad.appspot.com',
    messagingSenderId: '116025505880',
    appId: '1:116025505880:web:9e18954d651c9d45d0322d',
  },
};
