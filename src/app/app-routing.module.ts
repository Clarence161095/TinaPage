import { AdminComponent } from './page/admin/admin/admin.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassComponent } from './page/class/class.component';
import { HomeComponent } from './page/home/home.component';
import { ClassManageComponent } from './page/admin/class-manage/class-manage.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, pathMatch: 'full' },
  { path: 'admin', component: AdminComponent, pathMatch: 'full' },
  { path: 'classManage/:classId', component: ClassManageComponent, pathMatch: 'full' },
  { path: 'class/:classId', component: ClassComponent, pathMatch: 'full' },
  { path: '**', pathMatch: 'full', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
