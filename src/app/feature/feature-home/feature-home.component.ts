import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, IonVirtualScroll, ModalController, Platform } from '@ionic/angular';
import { NoteService } from 'src/app/services/note.service';
import { FeatureMatchupNoteComponent } from '../feature-matchup-note/feature-matchup-note.component';
import { Note } from '../../shared/interface/note.interface';
import { NavigationEnd, Router } from '@angular/router';
import { FighterImagePipe } from 'src/app/shared/pipes/fighter-image.pipe';
import { Fighter } from 'src/app/shared/interface/fighter.interface';
import { StorageService } from 'src/app/services/storage.service';
import { Settings } from 'src/app/shared/interface/settings.interface';
import { NgxMasonryComponent, NgxMasonryOptions } from 'ngx-masonry';


@Component({
  selector: 'smash-feature-home',
  templateUrl: './feature-home.component.html',
  styleUrls: ['./feature-home.component.scss'],
})
export class FeatureHomeComponent implements OnInit {

  dataLoaded: boolean;
  notes: Note[] = [];
  layout: any;
  devWidth = this.platform.width();

  @ViewChild(IonVirtualScroll) virtualScroll: IonVirtualScroll;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(NgxMasonryComponent) masonry: NgxMasonryComponent;


  dataList = [];
  vColMinWidth = 200; // virtual list columns min width as pixel
  exteraCol = 1; // how many columns should be add to virtual list
  nextPipe = 0;
  screenWidth: number;

  defaultLayout = false;
  gridLayout = false;
  masonryLayout = true;

  infiniteScrollThreshold: string = '150px';

  masonryOptions: NgxMasonryOptions = {
    fitWidth: true,
    horizontalOrder: true,
    gutter: 15,
    resize: true,
    initLayout: true,
    columnWidth: '.masonry-item',
    percentPosition: true
  }
  
  constructor(private noteService: NoteService, public modalController: ModalController,
    private router: Router, public platform: Platform, private storage: StorageService) {
    this.getScreenSize();
  }

  ngOnInit() {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.getNotesByUser();
      }
    });

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
      this.infiniteScrollThreshold = '200px';
    } else if (this.screenWidth <= 1024) {

      this.infiniteScrollThreshold = '150px';
    }
    this.exteraCol = Math.trunc(this.screenWidth / this.vColMinWidth) - 1;
    this.exteraCol = this.exteraCol < 0 ? 0 : this.exteraCol;
    this.exteraCol = this.exteraCol > 4 ? 4 : this.exteraCol; // if we want to have max virtual column count
  }

  onScroll(ev) {
    const offset = ev.detail.scrollTop;
  }

  itemHeightFn(item, index) {
    // better performance if setting item height
    return 215;
  }

  getNotesByUser() {
    this.noteService.getNotesByUser().then((snapshot) => {
      const data = snapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data() as Note
        };
      });
      console.table(data);
      this.notes = data;
      this.dataLoaded = !this.dataLoaded;
      console.log(this.dataLoaded);
    }, error => {
      console.log(error);
      this.dataLoaded = !this.dataLoaded;
      console.log(this.dataLoaded);

    });
  }

  async openNote(note: Note) {
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
      this.virtualScroll?.checkEnd(); // trigger end of virtual list
      event.target.complete();

      if (this.dataList.length === 1000) {
        event.target.disabled = true;
      }
    }, 500);
  }

}

