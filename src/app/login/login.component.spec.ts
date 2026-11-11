import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { LoginComponent } from './login.component';
import { LoginapiService } from '../services/loginapi.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginApi: jasmine.SpyObj<LoginapiService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    loginApi = jasmine.createSpyObj<LoginapiService>('LoginapiService', ['login']);
    router = jasmine.createSpyObj<Router>('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [
        { provide: LoginapiService, useValue: loginApi },
        { provide: Router, useValue: router }
      ]
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should mark the form as invalid when the fields are empty', () => {
    expect(component.loginForm.valid).toBeFalse();
  });

  it('should not call the API when the form is invalid', () => {
    component.onSubmit();
    expect(loginApi.login).not.toHaveBeenCalled();
  });

  it('should go to the home page when the login is correct', () => {
    loginApi.login.and.returnValue(of({ username: '0123456789', password: 'secret' }));
    component.loginForm.setValue({ phoneNumber: '0123456789', password: 'secret' });

    component.onSubmit();

    expect(loginApi.login).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
    expect(component.errorMsg).toBe('');
  });

  it('should show an error message when the login is wrong', () => {
    loginApi.login.and.returnValue(of({ username: '0123456789', password: 'other' }));
    component.loginForm.setValue({ phoneNumber: '0123456789', password: 'wrong' });

    component.onSubmit();

    expect(router.navigate).not.toHaveBeenCalled();
    expect(component.errorMsg).toBe('Invalid login credentials. Please try again.');
  });
});
