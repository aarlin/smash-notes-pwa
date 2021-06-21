import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'smash-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {
  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  goToDashboard() {
    this.router.navigateByUrl('');
  }

  

}
