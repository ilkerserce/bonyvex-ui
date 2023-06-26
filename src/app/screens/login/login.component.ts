import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  submitted: boolean = false;

  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
    private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  get f() {
    return this.loginForm.controls;
  }

  login() {
    if (this.loginForm.valid) {
      this.router.navigate(['/dashboard']);
    } else {
      console.log("yanlis")
    }
  }

}
