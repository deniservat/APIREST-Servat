import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { FullNamePipe } from '../core/pipes/full-name.pipe';
import { FontSizeDirective } from '../core/directives/font-size.directive';
import { DialogComponent } from './components/dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { APP_CONFIG, config } from '../core/injection-token/index';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../core/services/auth.service';


@NgModule({
  declarations: [
    SidebarComponent, 
    ToolbarComponent, 
    FullNamePipe, 
    FontSizeDirective, 
    DialogComponent,
  ],

  imports: [
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule, 
    RouterModule, 
    MatCardModule,
    MatCardModule, 
  ],
  exports: [
    MatSidenavModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatListModule,
    MatCardModule,
    SidebarComponent, 
    ToolbarComponent, 
    FullNamePipe, 
    FontSizeDirective,
    RouterModule, 

  ],
  providers: [
    { provide: APP_CONFIG, useValue: config }
  ],
})
export class SharedModule {}
