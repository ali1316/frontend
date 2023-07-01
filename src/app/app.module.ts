import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // import the FormsModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BranchListComponent } from './branch-list/branch-list.component';
import { BranchDetailComponent } from './branch-detail/branch-detail.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { RouterModule } from '@angular/router';  
@NgModule({
  declarations: [
    AppComponent,
    BranchListComponent,
    BranchDetailComponent,
    EmployeeListComponent,
    EmployeeDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, // add the FormsModule to the imports array
    AppRoutingModule,
    RouterModule.forRoot([  // Include the RouterModule in the imports array and define the routes
    { path: 'Branches', component: BranchListComponent },
    { path: 'Employees', component: EmployeeListComponent },
    { path: '', redirectTo: '/Branches', pathMatch: 'full' }])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
