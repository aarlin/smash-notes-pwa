import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    this.hideSpinner();
  }

  hideSpinner() {
    document.getElementById('nb-global-spinner').style.display = 'none';
  }
}
