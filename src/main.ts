import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import{EmployeeListComponent} from './app/employee-list/employee-list.component';
import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
