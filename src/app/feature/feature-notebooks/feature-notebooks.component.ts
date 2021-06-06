import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, IonVirtualScroll, ModalController } from '@ionic/angular';
import { FighterService } from 'src/app/services/fighter.service';
import { Fighter } from 'src/app/shared/interface/fighter.interface';
import { FighterImagePipe } from 'src/app/shared/pipes/fighter-image.pipe';
import { FeatureFighterNotesComponent } from '../feature-fighter-notes/feature-fighter-notes.component';
import { FilterModalComponent } from '../feature-filter-select/filter-modal.component';


@Component({
  selector: 'smash-feature-notebooks',
  templateUrl: './feature-notebooks.component.html',
  styleUrls: ['./feature-notebooks.component.scss'],
})
export class FeatureNotebooksComponent implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  pageToLoadNext: number = 1;
  pageSize: number = 20;

  fighters: Fighter[] = [];
  hideHeader = false;

  showLocationDetail = false;

  homeIcon: string;

  searchBarEnabled = false;

  @ViewChild(IonVirtualScroll) virtualScroll: IonVirtualScroll;
  // @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  dataList = [];
  vColMinWidth = 200; // virtual list columns min width as pixel
  exteraCol = 1; // how many columns should be add to virtual list
  nextPipe = 0;
  screenWidth: number;


  constructor(private fighterService: FighterService,
    private modalController: ModalController,
    private fighterImagePipe: FighterImagePipe) {
    this.getScreenSize();
  }

  ngOnInit() {
    this.homeIcon = 'assets/navigation/header_bar_ico.svg';
    this.fighterService.loadAll()
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

  @HostListener("window:resize", ["$event"])
  getScreenSize(event?) {
    this.screenWidth = window.innerWidth;
    this.exteraCol = Math.trunc(this.screenWidth / this.vColMinWidth) - 1;
    this.exteraCol = this.exteraCol < 0 ? 0 : this.exteraCol;
    this.exteraCol = this.exteraCol > 3 ? 3 : this.exteraCol; // if we want to have max virtual column count
  }

  itemHeightFn(item, index) {
    // better performance if setting item height
    return 215;
  }

  async loadFighterPage(fighter: Fighter) {
    const modal = await this.modalController.create({
      component: FeatureFighterNotesComponent,
      showBackdrop: true,
      backdropDismiss: true,
      cssClass: 'character-select-modal',
      componentProps: {
        fighter
      }
    });
    return await modal.present();
  }

  loadFighterImage(fighterName: string) {
    return this.fighterImagePipe.transform(fighterName, '');
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
    this.fighterService.loadPartial(this.pageToLoadNext, this.pageSize)
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

  cancelSearch(event) {
    console.log(event);
    this.searchBarEnabled = !this.searchBarEnabled;
  }

  trackFighters(index: number, itemObject: any) {
    return itemObject.name;
  }

}
