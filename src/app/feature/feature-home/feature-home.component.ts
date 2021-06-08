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


@Component({
  selector: 'smash-feature-home',
  templateUrl: './feature-home.component.html',
  styleUrls: ['./feature-home.component.scss'],
})
export class FeatureHomeComponent implements OnInit {

  dataLoaded: boolean;
  notes: Note[] = [];
  layout: any;

  @ViewChild(IonVirtualScroll) virtualScroll: IonVirtualScroll;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  dataList = [];
  vColMinWidth = 200; // virtual list columns min width as pixel
  exteraCol = 1; // how many columns should be add to virtual list
  nextPipe = 0;
  screenWidth: number;

  masonryOptions = {
    horizontalOrder: true,
    gutter: 10
  }

  constructor(private noteService: NoteService, public modalController: ModalController,
    private router: Router, private fighterImagePipe: FighterImagePipe, public platform: Platform, private storage: StorageService) {
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
      this.layout = settings.selectedHomeLayout;
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

  loadFighterImage(fighterName: string) {
    return this.fighterImagePipe.transform(fighterName, '')
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
      console.log(dataReturned.data);
    });
    return await modal.present();
  }

  trackNotes(index: number, itemObject: any) {
    return itemObject.id;
  }

  loadData(event: any) {
    setTimeout(() => {
      // load more data
      this.virtualScroll.checkEnd(); // trigger end of virtual list
      event.target.complete();

      if (this.dataList.length === 1000) {
        event.target.disabled = true;
      }
    }, 500);
  }

}

