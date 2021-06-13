import { Component, Input, OnInit } from '@angular/core';
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

  @Input() input: string;

  constructor(private fighterService: FighterService, private modalController: ModalController) {
    this.searchControl = new FormControl();
  }

  ngOnInit() {
    this.searching = true;
    this.fighterIcon = 'assets/navigation/ico_fighter_g.svg';

    this.fighterService.loadAll()
      .subscribe((fighters: Fighter[]) => {
        this.fighters = fighters;
        this.backupFighters = fighters;
      }, err => {
        console.log('Error while getting fighters')
      }, () => {
        this.searching = false;
      });
  }

  setFilteredItems(event: any) {
    this.fighters = this.backupFighters;
    const searchTerm = event.srcElement.value;

    console.log(searchTerm);

    if (!searchTerm) {
      return;
    }

    console.log(this.fighters);
    this.fighters = this.fighters.filter(fighter => {
      return fighter?.name?.toLowerCase().startsWith(searchTerm.toLowerCase());
    });
    console.log(this.fighters);
  }

  applyFighter(fighter: Fighter) {
    if (fighter?.name !== this.currentFighter?.name) {
      this.currentFighter = fighter;
    } else {
      this.currentFighter = undefined;
    }
    this.dismissModal();
  }

  isFighterSelected(fighter: Fighter) {
    console.log('isFighterSelected')
    if (this.input === 'fighter') {
      if (fighter === this.currentFighter) {
        return 'selected-player';
      }
    } else if (this.input === 'enemy') {
      if (fighter === this.currentFighter) {
        return 'selected-enemy';
      }
    }
  }

  dismissModal() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'fighter': this.currentFighter
    });
  }

  trackItems(index: number, itemObject: any) {
    return itemObject.name;
  }

}
