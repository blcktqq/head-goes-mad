// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { IAppConfig, IFirebaseConfig } from '@head-goes-mad/common';

export const environment: IAppConfig = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyBvTKGJUG9pUlc1W9OHJlywjDO5Guwr6TM',
    authDomain: 'head-goes-mad.firebaseapp.com',
    databaseURL:
      'https://head-goes-mad-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'head-goes-mad',
    storageBucket: 'head-goes-mad.appspot.com',
    messagingSenderId: '116025505880',
    appId: '1:116025505880:web:9e18954d651c9d45d0322d',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
