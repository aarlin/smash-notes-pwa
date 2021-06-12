import { Component, Input, OnInit } from '@angular/core';
import { FighterImagePipe } from 'src/app/shared/pipes/fighter-image.pipe';

@Component({
  selector: 'smash-masonry-card',
  templateUrl: './masonry-card.component.html',
  styleUrls: ['./masonry-card.component.scss'],
})
export class MasonryCardComponent implements OnInit {

  @Input() note;

  constructor(private fighterImagePipe: FighterImagePipe) { }

  ngOnInit() {}

  loadFighterImage(fighterName: string) {
    console.log('loadFighterImage')
    return this.fighterImagePipe.transform(fighterName, '')
  }

}
