import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { FighterService } from 'src/app/services/fighter.service';

interface Fighter {
  name?: string;
  appearsIn?: string[];
  url?: string;
}


@Component({
  selector: 'smash-feature-folders',
  templateUrl: './feature-folders.component.html',
  styleUrls: ['./feature-folders.component.scss'],
})
export class FeatureFoldersComponent implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  pageToLoadNext: number = 1;
  pageSize: number = 20;

  fighters: Fighter[] = [];

  constructor(private fighterService: FighterService) { }

  ngOnInit() {
    this.fighterService.load(this.pageToLoadNext, this.pageSize)
    .subscribe((fighters: Fighter[]) => {
      console.log(fighters);

      this.pageToLoadNext += 1;
      this.fighters = fighters.map(fighter => {
        fighter.url = `https://www.smashbros.com/assets_v2/img/fighter/thumb_a/${fighter.name}.png`;
        return fighter;
      });
    });
  }

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      this.loadMoreFighters();
    }, 150);
  }

  loadMoreFighters(): void {
    this.fighterService.load(this.pageToLoadNext, this.pageSize)
      .subscribe((fighters: Fighter[]) => {
        this.pageToLoadNext++;
        const loadedFighters: Fighter[] = fighters.map(fighter => {
          fighter.url = `https://www.smashbros.com/assets_v2/img/fighter/thumb_a/${fighter.name}.png`
          return fighter;
        });
        this.fighters = [...this.fighters, ...loadedFighters]
      }, (err => {
        console.log('no more pages');
      }));
  }

}
