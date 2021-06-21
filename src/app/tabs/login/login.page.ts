import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BackgroundService } from 'src/app/services/background.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  userForm: FormGroup;
  successMsg: string = '';
  errorMsg: string = '';
  backgroundImage: string;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private fb: FormBuilder,
    private backgroundService: BackgroundService
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

    this.backgroundImage = this.backgroundService.getRandomBackground();
  }

  checkIfLoggedIn() {
    this.authenticationService.userDetails().subscribe(response => {
      if (response !== null) {
        console.log(response);
        this.router.navigateByUrl('');
      }
    }, error => {
      console.log(error);
    })

  }

  signIn(value) {
    this.authenticationService.signInUser(value)
      .then((response) => {
        console.log(response)
        this.errorMsg = "";
        this.router.navigateByUrl('');
      }, error => {
        this.errorMsg = error.message;
        this.successMsg = "";
      })
  }

  signInAnonymously() {
    this.authenticationService.signInAnonymously()
      .then((response) => {
        console.log(response)
        this.errorMsg = "";
        this.router.navigateByUrl('');
      }, error => {
        this.errorMsg = error.message;
        this.successMsg = "";
      })
  }

  goToSignup() {
    this.router.navigateByUrl('register');
  }

}
