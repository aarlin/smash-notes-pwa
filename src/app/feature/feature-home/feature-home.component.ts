import { Component, HostListener, OnInit, ViewChild, ɵCodegenComponentFactoryResolver } from '@angular/core';
import { IonInfiniteScroll, IonSearchbar, IonVirtualScroll, ModalController, Platform, ToastController } from '@ionic/angular';
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
import { ThrowStmt } from '@angular/compiler';


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
  listStyle: string;

  constructor(private noteService: NoteService, public modalController: ModalController,
    private router: Router, public platform: Platform, private storage: StorageService, public toastController: ToastController) {
    this.getScreenSize();
  }

  ngOnInit() {
    this.getNotesByUser(this.notesPerSearch);

    this.platform.ready().then(() => {
      if (this.platform.is('android') || this.platform.is('ios') || this.platform.is('mobileweb')) {
        this.layout = 'list';
      } else {
        this.layout = 'grid';
      }
    });

    this.storage.get('settings').then((settings: Settings) => {
      switch (settings?.selectedHomeLayout) {
        case 'list':
          this.listStyle = 'display:block';
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
    console.log(index, note);
  }

  async getNotesByUser(searchLimit, lastNoteLoaded?) {
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

      this.dataLoaded = true;

    }, error => {
      console.log(error);
      this.dataLoaded = true;

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

      console.log(this.lastNoteLoaded);

      const notesLengthBefore = this.notes.length;

      this.getNotesByUser(this.notesPerSearch, this.lastNoteLoaded);

      const notesLengthAfter = this.notes.length;
      
      console.log(notesLengthAfter - notesLengthBefore < this.notesPerSearch)

      if (notesLengthAfter - notesLengthBefore < this.notesPerSearch) {
        event.target.disabled = true;
        this.presentToast('Loaded all notes');
      }
    }, 200);
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      cssClass: 'tabs-bottom'
    });
    toast.present();
  }


  setFilteredItems(event: any) {
    this.notes = this.backupNotes;
    this.searchValue = event.srcElement.value;

    if (!this.searchValue) {
      return;
    }

    this.notes = this.notes.filter(note => {
      return note?.player?.toLowerCase().startsWith(this.searchValue.toLowerCase())
        || note?.enemy?.toLowerCase().startsWith(this.searchValue.toLowerCase())
        || note?.title?.toLowerCase().includes(this.searchValue.toLowerCase())
        || note?.body?.toLowerCase().includes(this.searchValue.toLowerCase());
    });
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
    this.searchValue = null;
    this.searchBarEnabled = !this.searchBarEnabled;
  }


}

