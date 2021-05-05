import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FighterService } from 'src/app/services/fighter.service';

interface Fighter {
  name?: string;
  appearsIn?: string[];
  url?: string;
}

@Component({
  selector: 'smash-character-select-modal',
  templateUrl: './character-select-modal.component.html',
  styleUrls: ['./character-select-modal.component.scss'],
})
export class CharacterSelectModalComponent implements OnInit {

  fighterIcon: string;
  pageToLoadNext: number = 1;
  pageSize: number = 83;

  fighters: Fighter[] = [];
  backupFighters: Fighter[] = [];
  searchTerm: string = '';
  searchControl: FormControl;
  searching: boolean;

  constructor(private fighterService: FighterService) {
    this.searchControl = new FormControl();
  }

  ngOnInit() {
    this.searching = true;
    this.fighterIcon = 'assets/navigation/ico_fighter_g.svg';

    this.fighterService.load(this.pageToLoadNext, this.pageSize)
      .subscribe((fighters: Fighter[]) => {
        this.fighters = fighters.map(fighter => {
          fighter.url = `assets/stock-icons/svg/${fighter.name}.svg`;
          return fighter;
        });
        this.backupFighters = this.fighters;
        
      }, err => {
        console.log('Error while getting fighters')
      }, () => {
        this.searching = false;
      });
  }

  onSearchInput() {
    this.searching = true;
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

}
