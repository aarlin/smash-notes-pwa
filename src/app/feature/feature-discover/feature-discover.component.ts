import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { NoteService } from 'src/app/services/note.service';
import { Note } from 'src/app/shared/interface/note.interface';
import { FeatureMatchupNoteComponent } from '../feature-matchup-note/feature-matchup-note.component';

interface Discover {
  name: string,
  bg: string,
  bgAlt: string,
  svg: string,
  indexed: string
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

  discovery: Discover[] = [
    {
      name: 'Fighters',
      svg: 'https://www.smashbros.com/assets_v2/img/common/ico_fighter_g.svg',
      bg: `url('https://www.smashbros.com/assets_v2/img/top/globalnav__btn_bg_fighter_pc.png')`,
      bgAlt: 'https://www.smashbros.com/assets_v2/img/top/globalnav__btn_bg_fighter_pc.png',
      indexed: 'https://www.smashbros.com/assets_v2/img/common/sprite.svg#fighter_s'
    },
    {
      name: 'Stage',
      svg: 'https://www.smashbros.com/assets_v2/img/common/ico_stage_g.svg',
      bg: `url('https://www.smashbros.com/assets_v2/img/top/globalnav__btn_bg_stage_pc.png')`,
      bgAlt: 'https://www.smashbros.com/assets_v2/img/top/globalnav__btn_bg_stage_pc.png',
      indexed: 'https://www.smashbros.com/assets_v2/img/common/sprite.svg#stage_s'
    }

  ]

  constructor(private noteService: NoteService, private modalController: ModalController) {}

  ngOnInit() {
    this.getNotesByOthers(false, "");
  }

  discover() {
    console.log('discover')
  }

  loadData(event) {
    // setTimeout(() => {
      // console.log('Done');
      // event.target.complete();

      this.getNotesByOthers(true, event);

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      // if (data.length == 1000) {
        // event.target.disabled = true;
      // }
    // }, 500);
  }

  getNotesByOthers(isFirstLoad, event) {
    this.noteService.getNotesByOthers().then((snapshot) => {
      const data = snapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data() as Note
        };
      });
      console.log("All data discovered in 'notes' collection", data); 
      this.notes = [...data, ...this.notes];
      this.dataLoaded = !this.dataLoaded;

      if (isFirstLoad) {
        event.target.complete();
      }

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

}
