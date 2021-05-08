import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

interface Note {
  id: number,
  groupName: string,
  player: string
  enemy: string,
  title: string,
  body: string,
  enemyImage?: string
}

@Component({
  selector: 'smash-feature-matchup-note',
  templateUrl: './feature-matchup-note.component.html',
  styleUrls: ['./feature-matchup-note.component.scss'],
})
export class FeatureMatchupNoteComponent implements OnInit {
  playerIcon: string;
  enemyIcon: string;
  backArrowIcon: string;

  @Input() note: Note;

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    this.backArrowIcon = `assets/navigation/ico_arrow_s.svg`;
    // this.playerIcon = `assets/stock-icons/svg/${this.note.player}.svg`
    // this.enemyIcon = `assets/stock-icons/svg/${this.note.enemy}.svg`;
    // this.playerIcon = `assets/portraits/thumb_h/dr_mario.webp`;
    // this.enemyIcon = `assets/portraits/thumb_h/shulk.webp`;
    this.playerIcon = `assets/portraits/vertical/byleth.webp`;
    this.enemyIcon = `assets/portraits/vertical/fox.webp`;
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}