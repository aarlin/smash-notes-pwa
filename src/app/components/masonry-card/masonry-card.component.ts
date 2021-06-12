import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FighterImagePipe } from 'src/app/shared/pipes/fighter-image.pipe';

@Component({
  selector: 'smash-masonry-card',
  templateUrl: './masonry-card.component.html',
  styleUrls: ['./masonry-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MasonryCardComponent implements OnInit {

  @Input() note;
  @Input() playerImage;
  @Input() enemyImage;

  constructor() { }

  ngOnInit() {}


}
