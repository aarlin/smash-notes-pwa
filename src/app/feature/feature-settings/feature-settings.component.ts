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
  hideNotesIcon: string = 'eye-outline';
  dataSyncIcon: string = 'cloud-upload-outline';

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {}

  signOut() {
    this.authenticationService.signOutUser()
    .then((response) => {

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

  onChangeDataSync(event) {
    this.dataSyncIcon = event.detail.checked ? 'cloud-upload-outline': 'cloud-offline-outline';
  }

  onChangeHideNotes(event: any) {
    this.hideNotesIcon = event.detail.checked ? 'eye-off-outline': 'eye-outline'
  }

   colorTest(systemInitiatedDark) {
    if (systemInitiatedDark.matches) {
      document.body.setAttribute('data-theme', 'dark');
    } else {
      document.body.setAttribute('data-theme', 'light');
    }
  }

}
