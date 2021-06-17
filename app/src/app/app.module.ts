import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './common/menu/menu.component';
import { HomeComponent } from './page/home/home.component';
import { ClassComponent } from './page/class/class.component';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AdminComponent } from './page/admin/admin/admin.component';
import { LoginComponent } from './page/admin/login/login.component';
import { ClassManageComponent } from './page/admin/class-manage/class-manage.component';
import { RankComponent } from './page/admin/class-manage/rank/rank.component';
import { StudentComponent } from './page/admin/class-manage/student/student.component';
import { CommentComponent } from './page/admin/class-manage/comment/comment.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    ClassComponent,
    AdminComponent,
    LoginComponent,
    ClassManageComponent,
    RankComponent,
    StudentComponent,
    CommentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
