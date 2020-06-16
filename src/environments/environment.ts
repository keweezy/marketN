// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
interface AppEnv {
  production: boolean;
  base_uri: string;
}

export const environment = {
  production: false,
  base_uri: 'https://markerboy-api.herokuapp.com/',
};

export const environment_ = {
  production: false,
  firebase:{
    apiKey: "AIzaSyAq6Ndp8ZdBK_p8lxxhPnKm2FwJ90rpDLY",
    authDomain: "marketboy-a51e5.firebaseapp.com",
    databaseURL: "https://marketboy-a51e5.firebaseio.com",
    projectId: "marketboy-a51e5",
    storageBucket: "marketboy-a51e5.appspot.com",
    messagingSenderId: "559878660843",
    appId: "1:559878660843:web:51a256e6eabe353f9314ae",
    measurementId: "G-RDF093SPRL"
  }
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
