import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { DashboardModule } from './featured/dashboard/dashboard.module';
import { AuthModule } from './featured/auth/auth.module';
import { AuthRoutingModule } from './featured/auth/auth-routing.module';
import { HomeComponent } from './featured/dashboard/home/home.component';
import { provideHttpClient, withFetch } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    RouterModule,
    MatDialogModule,
    DashboardModule,
    AuthModule,
    AuthRoutingModule,
  ],
  providers: [
    provideHttpClient(withFetch()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
