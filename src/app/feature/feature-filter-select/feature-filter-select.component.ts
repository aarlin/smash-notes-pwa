import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FilterModalComponent } from './filter-modal/filter-modal.component';


@Component({
  selector: 'smash-feature-filter-select',
  templateUrl: './feature-filter-select.component.html',
  styleUrls: ['./feature-filter-select.component.scss'],
})
export class FeatureFilterSelectComponent implements OnInit {

  displayModal = false;

  constructor(private modalController: ModalController) { }

  async presentModal() {
    const modal = await this.modalController.create({
      component: FilterModalComponent,
      cssClass: 'my-custom-class',
      swipeToClose: true,
      presentingElement: await this.modalController.getTop() // Get the top-most ion-modal
    });
    return await modal.present();
  }

  ngOnInit() { }

  showFilterModal() {
    this.displayModal = !this.displayModal;
  }

}

