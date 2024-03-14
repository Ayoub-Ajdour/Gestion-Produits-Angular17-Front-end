import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClient, provideHttpClient,withFetch } from '@angular/common/http';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideFirebaseApp,initializeApp} from '@angular/fire/app';
import { provideAuth, initializeAuth, getAuth } from '@angular/fire/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD4SjTkDmNdELMjI1fxpNQnzNIiE405YY8",
  authDomain: "gestion-produits-25d6f.firebaseapp.com",
  databaseURL: "https://gestion-produits-25d6f-default-rtdb.firebaseio.com",
  projectId: "gestion-produits-25d6f",
  storageBucket: "gestion-produits-25d6f.appspot.com",
  messagingSenderId: "11619191331",
  appId: "1:11619191331:web:85ff83d6874534aaa37f96"
};
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(),provideHttpClient(withFetch()),importProvidersFrom([
    provideFirebaseApp(()=>initializeApp(firebaseConfig)),
    provideAuth(()=>getAuth())
  ])]
};
