import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { FighterService } from 'src/app/services/fighter.service';
import { FilterModalComponent } from '../feature-filter-select/filter-modal.component';

interface Fighter {
  name?: string;
  appearsIn?: string[];
  url?: string;
  stockIcon?: string;
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
  hideHeader = false;

  showLocationDetail = false;

  homeIcon: string;

  searchBarEnabled = false;

  constructor(private fighterService: FighterService, private modalController: ModalController) { }

  ngOnInit() {
    this.homeIcon = 'assets/navigation/header_bar_ico.svg';
    this.fighterService.load(this.pageToLoadNext, this.pageSize)
      .subscribe((fighters: Fighter[]) => {
        console.log(fighters);

        this.pageToLoadNext += 1;
        this.fighters = fighters.map(fighter => {
          fighter.url = `https://www.smashbros.com/assets_v2/img/fighter/thumb_a/${fighter.name}.png`;
          fighter.stockIcon = `assets/stock-icons/svg/${fighter.name}.svg`;
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

  // Dummy refresher function
  doRefresh(event) {
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  // show or hide a location string later
  onScroll(ev) {
    const offset = ev.detail.scrollTop;
    this.showLocationDetail = offset > 40;
  }

  close() {

  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: FilterModalComponent,
      cssClass: 'my-custom-class',
      swipeToClose: true,
      presentingElement: await this.modalController.getTop() // Get the top-most ion-modal
    });
    return await modal.present();
  }

  searchOpen() {
    this.searchBarEnabled = !this.searchBarEnabled;
  }

}
