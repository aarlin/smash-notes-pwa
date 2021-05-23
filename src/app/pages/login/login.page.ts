import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthenicationService } from 'src/app/services/authentication-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  userForm: FormGroup;
  successMsg: string = '';
  errorMsg: string = '';


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
    private authenticationService: AuthenicationService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.checkIfLoggedIn();

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


  }

  checkIfLoggedIn() {
    let user = this.authenticationService.userDetails();

    if (user != null) {
      this.router.navigateByUrl('dashboard');
    }
  }

  signIn(value) {
    this.authenticationService.signinUser(value)
      .then((response) => {
        console.log(response)
        this.errorMsg = "";
        this.router.navigateByUrl('dashboard');
      }, error => {
        this.errorMsg = error.message;
        this.successMsg = "";
      })
  }

  goToSignup() {
    this.router.navigateByUrl('register');
  }

}