import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { StorageService } from 'src/app/services/storage.service';
import { Settings } from 'src/app/shared/interface/settings.interface';

@Component({
  selector: 'smash-feature-settings',
  templateUrl: './feature-settings.component.html',
  styleUrls: ['./feature-settings.component.scss'],
})
export class FeatureSettingsComponent implements OnInit {

  themeMode: string = 'sunny-outline';
  hideNotesIcon: string = 'eye-outline';
  dataSyncIcon: string = 'cloud-upload-outline';
  shareIcon: string = 'share-outline';
  settings: Settings;

  constructor(private authenticationService: AuthenticationService,
    private router: Router, private storage: StorageService,
    private renderer: Renderer2) { }

  ngOnInit() {
    this.storage.get('settings').then((settings: Settings) => {
      if (!settings) {
        this.settings = {
          selectedHomeLayout: 'list',
          selectedNotebookLayout: 'virtual-div-grid',
          onlineSync: false,
          hideNotes: false,
          darkMode: true
        }
        this.saveSettings();
      }
      this.settings = settings;
      console.log(settings);
    });
  }

  logScrollStart() {

  }

  logScrolling(event) {

  }

  logScrollEnd() {

  }

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

  colorTest(systemInitiatedDark) {
    if (systemInitiatedDark.matches) {
      document.body.setAttribute('data-theme', 'dark');
    } else {
      document.body.setAttribute('data-theme', 'light');
    }
  }

  async onChangeDarkMode(event) {
    if (event.detail.checked) {
      this.renderer.setAttribute(document.body, 'color-theme', 'dark')
    } else {
      this.renderer.setAttribute(document.body, 'color-theme', 'light')
    }

    this.themeMode = event.detail.checked ? 'moon-outline' : 'sunny-outline';

    await this.storage.set('settings', { ...this.settings, darkMode: event.detail.checked });
  }

  async notebookLayoutChangeEvent(event: any) {
    console.log(event);
    await this.storage.set('settings', { ...this.settings, selectedNotebookLayout: event.detail.value });
  }

  async homeLayoutChangeEvent(event: any) {
    console.log(event);
    await this.storage.set('settings', { ...this.settings, selectedHomeLayout: event.detail.value });
  }

  async onChangeDataSync(event) {
    console.log(event);
    await this.storage.set('settings', { ...this.settings, onlineSync: event.detail.checked });
    this.dataSyncIcon = event.detail.checked ? 'cloud-upload-outline' : 'cloud-offline-outline';
  }

  async onChangeHideNotes(event: any) {
    console.log(event);
    await this.storage.set('settings', { ...this.settings, hideNotes: event.detail.checked });
    this.hideNotesIcon = event.detail.checked ? 'eye-off-outline' : 'eye-outline'
  }

  async saveSettings() {
    await this.storage.set('settings', this.settings);
  }
}
