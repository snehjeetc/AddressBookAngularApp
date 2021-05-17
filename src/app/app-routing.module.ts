import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddpersonComponent } from './components/addperson/addperson.component';
import { HomeComponent } from './components/home/home.component';


const routes: Routes = [
  {
    path: "",
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: "add", 
    component: AddpersonComponent
  },
  {
   path: 'home',
   component:HomeComponent 
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
