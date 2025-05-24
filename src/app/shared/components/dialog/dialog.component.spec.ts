import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogComponent } from './dialog.component';
import { MatDialogRef } from '@angular/material/dialog';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;
  let matDialogRefSpy: jasmine.SpyObj<MatDialogRef<DialogComponent>>;

  beforeEach(async () => {
    matDialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      declarations: [DialogComponent],
      providers: [{ provide: MatDialogRef, useValue: matDialogRefSpy }],
      schemas: [NO_ERRORS_SCHEMA] // para ignorar mat-* si no importás los módulos
    }).compileComponents();

    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the dialog with true when submit is called', () => {
    component.submit();
    expect(matDialogRefSpy.close).toHaveBeenCalledWith(true);
  });
});
