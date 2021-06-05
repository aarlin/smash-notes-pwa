import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'smash-feature-settings',
  templateUrl: './feature-settings.component.html',
  styleUrls: ['./feature-settings.component.scss'],
})
export class FeatureSettingsComponent implements OnInit {

  themeMode: string = 'sunny-outline';

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {}

  signOut() {
    this.authenticationService.signOutUser()
    .then((response) => {
      console.log(response)

      this.router.navigateByUrl('login');
    }, error => {
      // this.errorMsg = error.message;
      // this.successMsg = "";
    })
  }

  onClick(event){
    let systemDark = window.matchMedia("(prefers-color-scheme: dark)");
    systemDark.addListener(this.colorTest);
    if(event.detail.checked){
      document.body.setAttribute('data-theme', 'dark');
    }
    else{
      document.body.setAttribute('data-theme', 'light');
    }

    this.themeMode = (this.themeMode === 'sunny-outline' ? 'moon-outline': 'sunny-outline')
  }

   colorTest(systemInitiatedDark) {
    if (systemInitiatedDark.matches) {
      document.body.setAttribute('data-theme', 'dark');
    } else {
      document.body.setAttribute('data-theme', 'light');
    }
  }

}
