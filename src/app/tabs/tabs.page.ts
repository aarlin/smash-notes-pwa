import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  homeIcon: string;
  discoverIcon: string;
  fighterIcon: string;
  notebookIcon: string;

  constructor() {}

  ngOnInit() {
    this.homeIcon = 'assets/navigation/ico_top_g.svg';
    this.discoverIcon = 'assets/navigation/ico_howtoplay_g.svg';
    this.fighterIcon = 'assets/navigation/ico_fighter_g.svg';
    this.notebookIcon = 'assets/navigation/ico_blog_g.svg'
  }

  getChosenFighter(fighter: string) {
    if (fighter) {
      return `assets/stock-icons/svg/${fighter}.svg`;
    } else {
      return `assets/navigation/ico_fighter_g.svg`;
    }
  }

  displayFighterModal() {
    this.fighterIcon = 'assets/stock-icons/svg/bayonetta.svg';
  }

}
