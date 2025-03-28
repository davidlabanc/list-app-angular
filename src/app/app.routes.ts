import { Routes } from '@angular/router';
import { LoginPageComponent } from './ui/layouts/login-page/login-page.component';
import { RegisterPageComponent } from './ui/layouts/register-page/register-page.component';
import { ContactsPageComponent } from './ui/layouts/contacts-page/contacts-page.component';
import { ListsPageComponent } from './ui/layouts/lists-page/lists-page.component';

export const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'dashboard', component: ContactsPageComponent },
  { path: 'lists', component: ListsPageComponent },
  // { path: 'create/contact', component: RegisterPageComponent },
  // { path: 'create/list', component: RegisterPageComponent },
];
