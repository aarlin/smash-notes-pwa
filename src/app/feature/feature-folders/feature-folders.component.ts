import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'smash-feature-folders',
  templateUrl: './feature-folders.component.html',
  styleUrls: ['./feature-folders.component.scss'],
})
export class FeatureFoldersComponent implements OnInit {

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

  constructor() { }

  ngOnInit() {}

}
