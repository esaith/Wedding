import { AfterViewInit, Component, ElementRef, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { from, fromEvent } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('scrollbackground') scrollbackground?: ElementRef;
  @ViewChildren('section') sections?: QueryList<ElementRef>;
  private html?: HTMLElement;
  private maxScrollHeight = 0;
  private maxScrollBuffer = 400;
  itineraryTab = 1;
  clickMeClicked = false;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) { }

  ngAfterViewInit() {
    if (this.sections) {
      for (const section of this.sections) {
        this.maxScrollHeight += section.nativeElement.clientHeight;
      }
    }

    this.maxScrollHeight += this.maxScrollBuffer;

    if (this.scrollbackground) {
      const height = this.maxScrollHeight.toString() + 'px';
      this.renderer.setStyle(this.scrollbackground.nativeElement, 'height', height);
    }

    fromEvent(window, 'scroll').subscribe((x) => {
      if (this.sections) {
        let rollingSumOfClientHeights = 0;

        for (let i = 0; i < this.sections.length; ++i) {
          const section = this.sections.get(i)?.nativeElement;

          if (window.scrollY > rollingSumOfClientHeights + this.maxScrollBuffer || i === this.sections?.length - 1 && window.scrollY > rollingSumOfClientHeights) {
            const diff = Math.abs(rollingSumOfClientHeights - window.scrollY);
            this.renderer.setStyle(section, 'transform', `translateY(-${diff / section.clientHeight * 100 * 1.24}vh)`);
          } else {
            this.renderer.setStyle(section, 'transform', `translateY(0vh)`);
          }

          rollingSumOfClientHeights += section.clientHeight;
        }
      }
    });
  }

  selectItineraryTab(index: number) {
    this.itineraryTab = index;
    this.clickMeClicked = true;
  }
}
