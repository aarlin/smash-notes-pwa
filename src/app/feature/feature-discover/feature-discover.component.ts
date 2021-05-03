import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {}

  discover() {
    console.log('discover')
  }

}
