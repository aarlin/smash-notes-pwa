import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, ModalController, ToastController } from '@ionic/angular';
import { NoteService } from 'src/app/services/note.service';
import { Note } from 'src/app/shared/interface/note.interface';
import { FighterImagePipe } from 'src/app/shared/pipes/fighter-image.pipe';
import { FeatureMatchupNoteComponent } from '../feature-matchup-note/feature-matchup-note.component';

interface Discover {
  name: string,
  filter: string,
  bg: string,
  class: string
}

@Component({
  selector: 'smash-feature-discover',
  templateUrl: './feature-discover.component.html',
  styleUrls: ['./feature-discover.component.scss'],
})
export class FeatureDiscoverComponent implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  public dataLoaded: boolean;
  public notes: Note[] = [];
  lastNoteLoaded: any;

  discovery: Discover[] = [
    {
      name: 'Fighters',
      filter: 'fighter',
      bg: 'assets/carousel/ico_fighter_g.svg',
      class: 'discover-fighter'
    },
    {
      name: 'Stage',
      filter: 'stage',
      bg: '/assets/carousel/ico_stage_g.svg',
      class: 'discover-stage'
    },
    {
      name: 'Liked',
      filter: 'liked',
      bg: '/assets/carousel/menu_icon_assistfigure_pc.webp',
      class: 'discover-liked'
    }
  ];

  sliderConfig: {
    spaceBetween: 10,
    centeredSlides: true,
    slidesPerView: 1.6
  }

  constructor(private noteService: NoteService,
    private modalController: ModalController,
    private toastController: ToastController) { }

  ngOnInit() {
    this.getNotesByOthers(null);
  }

  discover() {
    console.log('discover')
  }

  filterBy(filter: string): void {
    this.notes = this.notes.filter(note => {
      note.body.includes(filter);
    })
  }

  loadData(event) {
    setTimeout(() => {
      // console.log('Done');
      event.target.complete();
      console.log({ event }, this.lastNoteLoaded)

      this.getNotesByOthers(event, this.lastNoteLoaded);

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      console.log(this.notes.length)
      if (this.notes.length > 7) {
        console.log(this.notes.length)
        event.target.disabled = true;
        this.presentToast('No more notes');
      }
    }, 200);
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  getNotesByOthers(event, lastNoteLoaded?) {
    this.noteService.getNotesByOthers(lastNoteLoaded).then((snapshot) => {
      const data = snapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data() as Note
        };
      });
      console.log("All data discovered in 'notes' collection", data);
      this.notes = [...this.notes, ...data];
      this.dataLoaded = true;

      this.lastNoteLoaded = snapshot.docs[snapshot.docs.length - 1];
      console.log(this.lastNoteLoaded);
      // if (isFirstLoad) {
      //   event.target.complete();
      // }

    }, error => {
      console.log(error);
      this.dataLoaded = !this.dataLoaded;
    });
  }

  testClick() {

  }

  async openNote(note: Note) {
    const modal = await this.modalController.create({
      component: FeatureMatchupNoteComponent,
      showBackdrop: true,
      backdropDismiss: true,
      cssClass: 'character-select-modal',
      componentProps: {
        note: note
      }
    });
    return await modal.present();
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

  trackNotes(index: number, itemObject: any) {
    return itemObject.id;
  }

}
