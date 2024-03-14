import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { FirstinterfaceComponent } from './app/firstinterface/firstinterface.component';
bootstrapApplication(FirstinterfaceComponent, appConfig)
  .catch((err) => console.error(err));
