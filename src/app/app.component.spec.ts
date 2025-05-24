import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([])],
      declarations: [AppComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have as title "Servat"', () => {
    expect(component.title).toEqual('Servat');
  });

  it('should toggle showStudents', () => {
    const initial = component.showStudents;
    component.toggleStudents();
    expect(component.showStudents).toBe(!initial);
  });

  it('should return user observable with expected data', (done) => {
    component.user.subscribe(user => {
      expect(user).toEqual({
        username: 'Martha Smith',
        role: 'admin'
      });
      done();
    });
  });
});
