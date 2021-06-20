import { Component, HostListener, OnInit, ViewChild, ɵCodegenComponentFactoryResolver } from '@angular/core';
import { IonInfiniteScroll, IonSearchbar, IonVirtualScroll, ModalController, Platform } from '@ionic/angular';
import { NoteService } from 'src/app/services/note.service';
import { FeatureMatchupNoteComponent } from '../feature-matchup-note/feature-matchup-note.component';
import { Note } from '../../shared/interface/note.interface';
import { NavigationEnd, Router } from '@angular/router';
import { FighterImagePipe } from 'src/app/shared/pipes/fighter-image.pipe';
import { Fighter } from 'src/app/shared/interface/fighter.interface';
import { StorageService } from 'src/app/services/storage.service';
import { Settings } from 'src/app/shared/interface/settings.interface';
import { NgxMasonryComponent, NgxMasonryOptions } from 'ngx-masonry';
import { FilterModalComponent } from '../feature-filter-select/filter-modal.component';


@Component({
  selector: 'smash-feature-home',
  templateUrl: './feature-home.component.html',
  styleUrls: ['./feature-home.component.scss'],
})
export class FeatureHomeComponent implements OnInit {

  dataLoaded: boolean;
  notes: Note[] = [];
  backupNotes: Note[] = [];
  layout: any;
  devWidth = this.platform.width();
  lastNoteLoaded: any;
  notesPerSearch: number = 15;

  @ViewChild(IonVirtualScroll) virtualScroll: IonVirtualScroll;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(NgxMasonryComponent) masonry: NgxMasonryComponent;
  @ViewChild('searchbar', { static: false }) searchbar: IonSearchbar;

  dataList = [];
  vColMinWidth = 200; // virtual list columns min width as pixel
  exteraCol = 1; // how many columns should be add to virtual list
  nextPipe = 0;
  screenWidth: number;

  defaultLayout = false;
  gridLayout = false;
  masonryLayout = true;

  infiniteScrollThreshold: string = '10%';

  masonryOptions: NgxMasonryOptions = {
    fitWidth: true,
    horizontalOrder: true,
    gutter: 15,
    resize: true,
    initLayout: true,
    columnWidth: '.masonry-item',
    percentPosition: true
  }

  searchBarEnabled = false;
  searchValue: string;

  constructor(private noteService: NoteService, public modalController: ModalController,
    private router: Router, public platform: Platform, private storage: StorageService) {
    this.getScreenSize();
  }

  ngOnInit() {
    // this.router.events.subscribe((event: any) => {
    //   if (event instanceof NavigationEnd) {
    //     this.getNotesByUser();
    //   }
    // });
    this.getNotesByUser(this.notesPerSearch);
    this.platform.ready().then(() => {
      if (this.platform.is('android') || this.platform.is('ios') || this.platform.is('mobileweb')) {
        this.layout = 'list';
      } else {
        this.layout = 'grid';
      }
    });

    this.storage.get('settings').then((settings: Settings) => {
      // if (!settings) {
      //   this.settings = {
      //     selectedHomeLayout: 'list',
      //     selectedNotebookLayout: 'virtual-div-grid',
      //     onlineSync: false,
      //     hideNotes: false,
      //     darkMode: true
      //   }
      //   this.saveSettings();
      // }
      switch (settings?.selectedHomeLayout) {
        case 'list':
          this.defaultLayout = true;
          this.gridLayout, this.masonryLayout = false;
          break;
        case 'grid':
          this.gridLayout = true;
          this.defaultLayout, this.masonryLayout = false;
          break;
        case 'masonry':
          this.masonryLayout = true;
          this.defaultLayout, this.gridLayout = false;
          break;
      }
    });
  }

  @HostListener("window:resize", ["$event"])
  getScreenSize(event?) {
    this.screenWidth = window.innerWidth;

    if (this.screenWidth > 1024) {
      this.infiniteScrollThreshold = '10%';
    } else if (this.screenWidth <= 1024) {

      this.infiniteScrollThreshold = '10%';
    }
    this.exteraCol = Math.trunc(this.screenWidth / this.vColMinWidth) - 1;
    this.exteraCol = this.exteraCol < 0 ? 0 : this.exteraCol;
    this.exteraCol = this.exteraCol > 6 ? 6 : this.exteraCol; // if we want to have max virtual column count
  }

  onScroll(ev) {
    const offset = ev.detail.scrollTop;
  }

  itemHeightFn(item, index) {
    // better performance if setting item height
    return 215;
  }

  logNote(index: number, note: Note) {
    console.log('logNote')
    console.log(index, note);
  }

  getNotesByUser(searchLimit, lastNoteLoaded?) {
    this.noteService.getNotesByUser(searchLimit, lastNoteLoaded).then((snapshot) => {
      const data = snapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data() as Note
        };
      });
      console.table(data);
      this.notes = [...this.notes, ...data];
      this.backupNotes = this.notes;

      this.lastNoteLoaded = snapshot.docs[snapshot.docs.length - 1];
      console.log(this.lastNoteLoaded);

      this.dataLoaded = true;
      console.log(this.dataLoaded);
    }, error => {
      console.log(error);
      this.dataLoaded = true;
      console.log(this.dataLoaded);

    });
  }

  async openMasonryNote(index: number) {
    console.log('open note from home')
    console.log(index);
    if (index === this.notes.length) {
      console.log('same index');
      index -= 1;
    }
    const modal = await this.modalController.create({
      component: FeatureMatchupNoteComponent,
      showBackdrop: true,
      backdropDismiss: true,
      cssClass: 'character-select-modal',
      componentProps: {
        note: this.notes[index],
        update: true
      }
    });
    modal.onWillDismiss().then(dataReturned => {
      // trigger when about to close the modal
      console.log(dataReturned?.data?.modified)
      if (dataReturned?.data?.modified) {
        this.masonry.reloadItems();
        this.masonry.layout();
      }
    });
    return await modal.present();
  }

  async openNote(note: Note) {
    console.log('open note from home')
    console.log(note);
    const modal = await this.modalController.create({
      component: FeatureMatchupNoteComponent,
      showBackdrop: true,
      backdropDismiss: true,
      cssClass: 'character-select-modal',
      componentProps: {
        note: note,
        update: true
      }
    });
    modal.onWillDismiss().then(dataReturned => {
      // trigger when about to close the modal
      console.log(dataReturned?.data?.modified)
      if (dataReturned?.data?.modified) {
        this.masonry.reloadItems();
        this.masonry.layout();
      }
    });
    return await modal.present();
  }

  trackNotes(index: number, itemObject: any) {
    return itemObject.id;
  }

  loadData(event: any) {
    setTimeout(() => {
      // load more data
      // this.virtualScroll?.checkEnd(); // trigger end of virtual list
      event.target.complete();

      this.getNotesByUser(this.notesPerSearch, this.lastNoteLoaded);

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      console.log(this.notes.length)

      if (this.notes.length < this.notesPerSearch) {
        event.target.disabled = true;
      }
    }, 500);
  }

  setFilteredItems(event: any) {
    this.notes = this.backupNotes;
    this.searchValue = event.srcElement.value;

    console.log(this.searchValue);

    if (!this.searchValue) {
      return;
    }
    

    console.log(this.notes);
    this.notes = this.notes.filter(note => {
      return note?.player?.toLowerCase().startsWith(this.searchValue.toLowerCase())
            || note?.enemy?.toLowerCase().startsWith(this.searchValue.toLowerCase())
            || note?.title?.toLowerCase().includes(this.searchValue.toLowerCase())
            || note?.body?.toLowerCase().includes(this.searchValue.toLowerCase());
    });
    console.log(this.notes);
  }

  resetNotes() {
    this.notes = this.backupNotes;
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

