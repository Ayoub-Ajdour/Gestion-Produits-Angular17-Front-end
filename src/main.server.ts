import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';
import { FirstinterfaceComponent } from './app/firstinterface/firstinterface.component';
const bootstrap = () => bootstrapApplication(FirstinterfaceComponent, config);

export default bootstrap;
