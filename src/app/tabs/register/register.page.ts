import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BackgroundService } from 'src/app/services/background.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {

  userForm: FormGroup;
  successMsg: string = '';
  errorMsg: string = '';

  backgroundImage: string;

  error_msg = {
    'email': [
      {
        type: 'required',
        message: 'Provide email.'
      },
      {
        type: 'pattern',
        message: 'Email is not valid.'
      }
    ],
    'password': [
      {
        type: 'required',
        message: 'Password is required.'
      },
      {
        type: 'minlength',
        message: 'Password length should be 6 characters long.'
      }
    ]
  };

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private fb: FormBuilder,
    private backgroundService: BackgroundService
  ) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])),
    });

    this.backgroundImage = this.backgroundService.getRandomBackground();
  }

  signUp(value) {
    this.authenticationService.createUser(value.email, value.password)
      .then((response) => {
        this.errorMsg = "";
        this.successMsg = "New user created.";
      }, error => {
        this.errorMsg = error.message;
        this.successMsg = "";
      })
  }

  goToLogin() {
    this.router.navigateByUrl('login');
  }

}
