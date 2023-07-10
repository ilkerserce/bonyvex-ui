import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {

  submitted: boolean = false;
  returnUrl = "";

  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private toastrService: ToastrService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })

    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'];
  }

  get f() {
    return this.loginForm.controls;
  }

  login() {
    if (this.loginForm.valid) {
      this.userService.login({
        username: this.f['username'].value,
        password: this.f['password'].value
      }).subscribe({
        next: res => {
          let data = res;
          if (res == true) {
            sessionStorage.setItem('loggedIn', 'true')
            this.router.navigate(['/admin/foods']);
            this.toastrService.success('Giriş Başarılı');
          }
        },
        error: err => {
          this.toastrService.error(err.message);
        }
      });
    }
  }
}
