import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, IonSearchbar, IonVirtualScroll, ModalController } from '@ionic/angular';
import { FighterService } from 'src/app/services/fighter.service';
import { StorageService } from 'src/app/services/storage.service';
import { Fighter } from 'src/app/shared/interface/fighter.interface';
import { Settings } from 'src/app/shared/interface/settings.interface';
import { FighterImagePipe } from 'src/app/shared/pipes/fighter-image.pipe';
import { FeatureFighterNotesComponent } from '../feature-fighter-notes/feature-fighter-notes.component';
import { FilterModalComponent } from '../feature-filter-select/filter-modal.component';


@Component({
  selector: 'smash-feature-notebooks',
  templateUrl: './feature-notebooks.component.html',
  styleUrls: ['./feature-notebooks.component.scss'],
})
export class FeatureNotebooksComponent implements OnInit {
  fighters: Fighter[] = [];
  backupFighters: Fighter[] = [];
  hideHeader = false;
  showLocationDetail = false;
  homeIcon: string;
  searchBarEnabled = false;
  searchValue: string;

  notebookLayout: any;

  dataList = [];
  vColMinWidth = 200; // virtual list columns min width as pixel
  exteraCol = 1; // how many columns should be add to virtual list
  nextPipe = 0;
  screenWidth: number;

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonVirtualScroll) virtualScroll: IonVirtualScroll;
  @ViewChild('searchbar', { static: false }) searchbar: IonSearchbar;

  constructor(private fighterService: FighterService,
    private modalController: ModalController,
    private storage: StorageService) {
    this.getScreenSize();
  }

  ngOnInit() {
    this.homeIcon = 'assets/navigation/header_bar_ico.svg';
    this.fighterService.loadAll()
      .subscribe((fighters: Fighter[]) => {
        this.fighters = fighters.map(fighter => {
          fighter.url = `https://www.smashbros.com/assets_v2/img/fighter/thumb_a/${fighter.name}.png`;
          fighter.stockIcon = `assets/stock-icons/svg/${fighter.name}.svg`;
          return fighter;
        });
        this.backupFighters = [...this.fighters];
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

  trackFighters(index: number, itemObject: any) {
    return itemObject.name;
  }

  setFilteredItems(event: any) {
    this.fighters = this.backupFighters;
    this.searchValue = event.srcElement.value;

    console.log(this.searchValue);

    if (!this.searchValue) {
      return;
    }

    console.log(this.fighters);
    this.fighters = this.fighters.filter(fighter => {
      return fighter?.name?.toLowerCase().startsWith(this.searchValue.toLowerCase());
    });
    console.log(this.fighters);
  }

  resetFighters() {
    this.fighters = this.backupFighters;
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

  toggleSearch() {
    this.searchBarEnabled = !this.searchBarEnabled;
  }

  focusSearchbar() {
    setTimeout(() => {
      // Set the focus to the input box of the ion-Searchbar component
      this.searchbar?.setFocus();
    }, 500);
  }

  cancelSearch(event) {
    console.log(event);
    console.log(this.searchValue)

    this.searchValue = null;
    console.log(this.searchValue)
    this.searchBarEnabled = !this.searchBarEnabled;
  }

}