import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignUpInfo } from 'src/app/auth/signup-info';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  passwordError: boolean = false;
  registerForm: FormGroup;
  signupInfo: SignUpInfo;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirmation: ['', Validators.required]
    });
  }

  registerFormPasswordReinit(){
    this.registerForm.controls['password'].reset();
    this.registerForm.controls['passwordConfirmation'].reset();
  }

  register() {

    console.log('register()', this.registerForm.value);
    let form = this.registerForm.value;
    if(form.password !== form.passwordConfirmation){
      this.passwordError = true;
      this.registerFormPasswordReinit();

    } else {
      this.passwordError = false;
      // TODO register


      this.signupInfo = new SignUpInfo(
        form.name,
        form.username,
        form.email,
        form.password);

      this.authService.signUp(this.signupInfo).subscribe(
        data => {
          console.log("sign up OK : ",data);
          this.isSignedUp = true;
          this.isSignUpFailed = false;
          this.router.navigate(['proliferation']);
        },
        error => {
          console.log("sign up ERROR : ",error);
          this.errorMessage = error.error.message;
          this.isSignUpFailed = true;
        }
      );




    }

    /* this.loginservice.authenticate(this.loginForm.value.username, this.loginForm.value.password).subscribe(
      user => console.log("user", user)
    )

    if (this.loginservice.authenticate(this.loginForm.value.username, this.loginForm.value.password).subscribe) {
      this.router.navigate([''])
      this.invalidLogin = false
    } else
      this.invalidLogin = true
  } */
  }
}
