import { AfterViewInit, Directive, HostListener, Input, Renderer2 } from '@angular/core';
import { isPlatform, DomController } from '@ionic/angular';
 
@Directive({
  selector: '[appHideHeader]'
})
export class HideHeaderDirective implements AfterViewInit {
  @Input('appHideHeader') header: any;
  private headerHeight = isPlatform('ios') ? 44 : 56;
  private children: any;
 
  constructor(
    private renderer: Renderer2,
    private domCtrl: DomController,
  ) { }
 
  ngAfterViewInit(): void {
    this.header = this.header.el;
    this.children = this.header.children;
    this.renderer.setStyle(this.header, 'webkitTransition', 'top 800ms');
  }
 
  @HostListener('ionScroll', ['$event']) onContentScroll($event: any) {
    if ($event.detail.scrollTop >= 50 && $event.detail.deltaY > 0) {
      this.renderer.setStyle(this.header, 'top', `-76px`);
    } else if ($event.detail.deltaY <= 0) {
        this.renderer.setStyle(this.header, 'top', `0px`);
    }
  }
}