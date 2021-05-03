import { Component, OnInit } from '@angular/core';
import { FighterService } from 'src/app/services/fighter.service';

interface Fighter {
  name: string;
  appearsIn: string[]
}


@Component({
  selector: 'smash-feature-folders',
  templateUrl: './feature-folders.component.html',
  styleUrls: ['./feature-folders.component.scss'],
})
export class FeatureFoldersComponent implements OnInit {
  pageToLoadNext: 1;
  pageSize = 100;

  fighters: any[] = [
    "https://www.smashbros.com/assets_v2/img/fighter/thumb_a/steve.png",
    "https://www.smashbros.com/assets_v2/img/fighter/thumb_a/homura.png",
    "https://www.smashbros.com/assets_v2/img/fighter/thumb_a/sheik.png",
    "https://www.smashbros.com/assets_v2/img/fighter/thumb_a/snake.png",
    "https://www.smashbros.com/assets_v2/img/fighter/thumb_a/pac_man.png",
    "https://www.smashbros.com/assets_v2/img/fighter/thumb_a/mario.png",
    "https://www.smashbros.com/assets_v2/img/fighter/thumb_a/roy.png",
    "https://www.smashbros.com/assets_v2/img/fighter/thumb_a/marth.png"
  ]

  constructor(private fighterService: FighterService) { }

  ngOnInit() {
    this.fighterService.load(this.pageToLoadNext, this.pageSize)
    .subscribe((fighters: Fighter[]) => {
      this.fighters = fighters.map(fighter => {
        return `https://www.smashbros.com/assets_v2/img/fighter/thumb_a/${fighter.name}.png`
      });
    });
  }

}
