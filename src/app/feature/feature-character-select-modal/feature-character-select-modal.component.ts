import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { FighterService } from 'src/app/services/fighter.service';
import { Fighter } from 'src/app/shared/interface/fighter.interface';
import { FighterImagePipe } from 'src/app/shared/pipes/fighter-image.pipe';


@Component({
  selector: 'smash-feature-character-select-modal',
  templateUrl: './feature-character-select-modal.component.html',
  styleUrls: ['./feature-character-select-modal.component.scss'],
})
export class FeatureCharacterSelectModalComponent  {

  fighterIcon: string;
  pageToLoadNext: number = 1;
  pageSize: number = 83;

  fighters: Fighter[] = [];
  backupFighters: Fighter[] = [];
  searchTerm: string = '';
  searchControl: FormControl;
  searching: boolean;
  currentFighter: Fighter;

  constructor(private fighterService: FighterService, private modalController: ModalController, private fighterImagePipe: FighterImagePipe) {
    this.searchControl = new FormControl();
  }

  ngOnInit() {
    this.searching = true;
    this.fighterIcon = 'assets/navigation/ico_fighter_g.svg';

    this.fighterService.loadAll()
      .subscribe((fighters: Fighter[]) => {
        this.fighters = fighters;
      }, err => {
        console.log('Error while getting fighters')
      }, () => {
        this.searching = false;
      });
  }

  setFilteredItems(event: any) {
    this.fighters = this.backupFighters;
    const searchTerm = event.srcElement.value;

    if (!searchTerm) {
      return;
    }

    this.fighters = this.fighters.filter(fighter => {
      return fighter?.name?.toLowerCase().startsWith(searchTerm.toLowerCase());
    });
  }

  loadFighterImage(fighterName: string) {
    return this.fighterImagePipe.transform(fighterName, '') 
  }

  applyFighter(fighter: Fighter) {
    if (fighter?.name !== this.currentFighter?.name) {
      this.currentFighter = fighter;
    } else {
      this.currentFighter = undefined;
    }
  }

  isFighterSelected(fighter: Fighter) {
    return fighter === this.currentFighter;
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'fighter': this.currentFighter
    });
  }

}