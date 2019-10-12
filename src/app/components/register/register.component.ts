import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {SignUpInfo} from 'src/app/auth/signup-info';
import {AuthService} from 'src/app/auth/auth.service';
import {AuthLoginInfo} from 'src/app/auth/login-info';
import {TokenStorageService} from 'src/app/auth/token-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  passwordError = false;
  registerForm: FormGroup;
  signupInfo: SignUpInfo;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private authService: AuthService,
              private tokenStorage: TokenStorageService) {
  }


  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirmation: ['', Validators.required]
    });
  }

  registerFormPasswordReinit() {
    this.registerForm.controls['password'].reset();
    this.registerForm.controls['passwordConfirmation'].reset();
  }

  register() {

    console.log('register()', this.registerForm.value);
    const form = this.registerForm.value;
    if (form.password !== form.passwordConfirmation) {
      this.passwordError = true;
      this.registerFormPasswordReinit();

    } else {
      this.passwordError = false;

      this.signupInfo = new SignUpInfo(
        form.name,
        form.username,
        form.email,
        form.password);

      this.authService.signUp(this.signupInfo).subscribe(
        data => {
          this.isSignedUp = true;
          this.isSignUpFailed = false;
          this.login();
        },
        (error) => {
          this.errorMessage = error.error.message;
          this.isSignUpFailed = true;
        }
      );
    }
  }

  login() {
    const loginInfo = new AuthLoginInfo(
      this.signupInfo.username,
      this.signupInfo.password);

    this.authService.attemptAuth(loginInfo).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveRefreshToken(data.refreshToken);
        this.tokenStorage.saveUsername(data.username);
        this.tokenStorage.saveAuthorities(data.authorities);
        this.router.navigate(['proliferation']);
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
      }
    );
  }
}
