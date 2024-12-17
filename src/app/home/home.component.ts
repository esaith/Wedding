import { AfterViewInit, Component, ElementRef, QueryList, Renderer2, ViewChild } from '@angular/core';
import { fromEvent, lastValueFrom } from 'rxjs';
import { FamilyGuest } from '../entities/family-guest';
import { Guest } from '../entities/guest';
import { GuestService } from '../entities/guest.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('scrollbackground') scrollbackground?: ElementRef;
  sections?: Array<Element>;
  private maxScrollHeight = 0;
  private maxScrollBuffer = 2000;
  itineraryTab = 1;
  clickMeClicked = false;
  place = 'eat'

  isGuestAttending = true;
  isGuestNotAttending = false;

  familyLastName = '';

  plusOneAttendingShow = false;

  families = new Array<FamilyGuest>();
  family: FamilyGuest | null | undefined;

  constructor(private renderer: Renderer2, private guestService: GuestService) { }

  ngAfterViewInit() {
    this.maxScrollHeight = 0;
    setTimeout(() => {

      this.sections = Array.from(document.querySelectorAll('.section'));

      for (const section of this.sections) {
        this.maxScrollHeight += section.clientHeight;
      }

      this.maxScrollHeight += this.maxScrollBuffer;

      if (this.scrollbackground) {
        const height = this.maxScrollHeight.toString() + 'px';
        this.renderer.setStyle(this.scrollbackground.nativeElement, 'height', height);
      }
    }, 500);

    fromEvent(window, 'scroll').subscribe((x) => {
      if (this.sections) {
        console.log('window.scrollY', Math.ceil(window.scrollY), this.sections[0].clientHeight, this.sections[1].clientHeight, this.sections[2].clientHeight)
        let rollingSumOfClientHeights = 0;

        for (let i = 0; i < this.sections.length; ++i) {
          const section = this.sections[i];

          if (window.scrollY > rollingSumOfClientHeights + this.maxScrollBuffer
            || i === this.sections?.length - 1 && window.scrollY > rollingSumOfClientHeights) {

            const diff = Math.abs(rollingSumOfClientHeights - window.scrollY);
            this.renderer.setStyle(section, 'transform', `translateY(-${diff / section.clientHeight * 100}vh)`);
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

  async searchByName() {
    const family = await lastValueFrom(this.guestService.getGuestByName(this.familyLastName));

    if (family) {
      this.family = family;
      this.updateCeremonyShow();
    }
  }

  selectPlace(place: string) {
    this.place = place;
  }

  toggleIsGuestAttending() {
    if (!this.family)
      return;

    this.isGuestAttending = !this.isGuestAttending;
    this.isGuestNotAttending = !this.isGuestAttending;

    this.family.isAttending = this.isGuestAttending;
  }
  toggleIsGuestAttendingNo() {
    if (!this.family)
      return;

    this.isGuestNotAttending = !this.isGuestNotAttending;
    this.isGuestAttending = !this.isGuestNotAttending;

    this.family.isAttending = this.isGuestAttending;
  }

  updateCeremonyAttendence(guest: Guest) {
    if (!this.family)
      return;

    if (guest.isAdult) {
      this.family.atMaxCeremonyAdult = this.family.guests.filter(x => x.isAdult && x.attendingCeremony).length === this.family.maxAdultsToCeremony;
    } else {
      this.family.atMaxCeremonyKid = this.family.guests.filter(x => !x.isAdult && x.attendingCeremony).length === this.family.maxKidsToCeremony;
    }
  }

  updateCeremonyShow() {
    if (!this.family)
      return;

    this.family.atMaxShow = this.family.guests.filter(x => x.attendingShow).length === this.family.maxShowTickets
  }
}


