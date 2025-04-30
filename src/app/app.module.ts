import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './feature/dashboard/home/home.component';
import { DashboardModule } from "./feature/dashboard/dashboard.module";
import { AuthModule } from './feature/auth/auth.module';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    RouterModule,
    DashboardModule, 
    AuthModule
],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
