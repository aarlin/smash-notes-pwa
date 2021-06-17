import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackgroundService {
  potentialBackgroundImages = [
    "/assets/background/banjo_and_kazooie.jpg",
    "/assets/background/bayonetta.jpg,bg_img.png,bowser.jpg",
    "/assets/background/bowser_jr.jpg",
    "/assets/background/byleth.jpg",
    "/assets/background/captain_falcon.jpg",
    "/assets/background/chrom.jpg",
    "/assets/background/cloud.jpg",
    "/assets/background/daisy.jpg",
    "/assets/background/dark_pit.jpg",
    "/assets/background/dark_samus.jpg",
    "/assets/background/diddy_kong.jpg",
    "/assets/background/donkey_kong.jpg",
    "/assets/background/dq_hero.jpg",
    "/assets/background/dr_mario.jpg",
    "/assets/background/duck_hunt.jpg",
    "/assets/background/falco.jpg",
    "/assets/background/fox.jpg",
    "/assets/background/ganondorf.jpg",
    "/assets/background/gaogaen.jpg",
    "/assets/background/greninja.jpg",
    "/assets/background/homura.jpg",
    "/assets/background/ice_climbers.jpg",
    "/assets/background/ike.jpg",
    "/assets/background/inkling.jpg",
    "/assets/background/jigglypuff.jpg",
    "/assets/background/joker.jpg",
    "/assets/background/ken.jpg",
    "/assets/background/king_dedede.jpg",
    "/assets/background/king_k_rool.jpg",
    "/assets/background/kirby.jpg",
    "/assets/background/link.jpg",
    "/assets/background/little_mac.jpg",
    "/assets/background/lucario.jpg",
    "/assets/background/lucas.jpg",
    "/assets/background/lucina.jpg",
    "/assets/background/luigi.jpg",
    "/assets/background/mario.jpg",
    "/assets/background/marth.jpg",
    "/assets/background/mega_man.jpg",
    "/assets/background/meta_knight.jpg",
    "/assets/background/mewtwo.jpg",
    "/assets/background/mii_fighter.jpg",
    "/assets/background/minmin.jpg",
    "/assets/background/mr_game_and_watch.jpg",
    "/assets/background/ness.jpg",
    "/assets/background/olimar.jpg",
    "/assets/background/pac_man.jpg",
    "/assets/background/packun_flower.jpg",
    "/assets/background/palutena.jpg",
    "/assets/background/peach.jpg",
    "/assets/background/pichu.jpg",
    "/assets/background/pikachu.jpg",
    "/assets/background/pit.jpg",
    "/assets/background/pokemon_trainer.jpg",
    "/assets/background/richter.jpg",
    "/assets/background/ridley.jpg",
    "/assets/background/rob.jpg",
    "/assets/background/robin.jpg",
    "/assets/background/rosalina_and_luma.jpg",
    "/assets/background/roy.jpg",
    "/assets/background/ryu.jpg",
    "/assets/background/samus.jpg",
    "/assets/background/sephiroth.jpg",
    "/assets/background/sheik.jpg",
    "/assets/background/shizue.jpg",
    "/assets/background/shulk.jpg",
    "/assets/background/simon.jpg",
    "/assets/background/snake.jpg",
    "/assets/background/sonic.jpg",
    "/assets/background/steve.jpg",
    "/assets/background/terry.jpg",
    "/assets/background/toon_link.jpg",
    "/assets/background/villager.jpg",
    "/assets/background/wario.jpg",
    "/assets/background/wii_fit_trainer.jpg",
    "/assets/background/wolf.jpg",
    "/assets/background/yoshi.jpg",
    "/assets/background/young_link.jpg",
    "/assets/background/zelda.jpg",
    "/assets/background/zero_suit_samus.jpg",
  ]

  constructor() { }

  getRandomBackground(): string {
    console.log(this.potentialBackgroundImages[Math.floor(Math.random() * this.potentialBackgroundImages.length)])
    return this.potentialBackgroundImages[Math.floor(Math.random() * this.potentialBackgroundImages.length)];
  }
}