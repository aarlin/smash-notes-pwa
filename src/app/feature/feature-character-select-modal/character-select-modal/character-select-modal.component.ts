import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'smash-character-select-modal',
  templateUrl: './character-select-modal.component.html',
  styleUrls: ['./character-select-modal.component.scss'],
})
export class CharacterSelectModalComponent implements OnInit {

  fighterIcon: string;
  
  constructor() { }

  ngOnInit() {
    this.fighterIcon = 'assets/navigation/ico_fighter_g.svg';
  }

}
